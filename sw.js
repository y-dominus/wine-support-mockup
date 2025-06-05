// ワイサポ Service Worker - GitHub Pages 用
const CACHE_NAME = 'winesupport-v1.0.0';
const CACHE_URLS = [
    './',
    './index.html',
    './html/dashboard.html',
    './css/style.css',
    './js/common_parts.js',
    './js/main.js',
    './sommia.png',
    './assets/images/winesupport_logo.png'
];

// インストール時のキャッシュ
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('🚀 ワイサポ: キャッシュを開いています');
                return cache.addAll(CACHE_URLS.map(url => {
                    // 相対パスを絶対パスに変換
                    return new URL(url, self.location).href;
                }));
            })
            .catch(err => {
                console.log('❌ キャッシュエラー:', err);
                // エラーが発生してもインストールは継続
                return Promise.resolve();
            })
    );
    self.skipWaiting();
});

// アクティベーション時の古いキャッシュクリア
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🧹 古いキャッシュを削除:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// フェッチ時のキャッシュ戦略
self.addEventListener('fetch', event => {
    // GitHub Pages では一部のリクエストをスキップ
    if (event.request.url.includes('github.io/_git/') || 
        event.request.url.includes('api.github.com') ||
        event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // キャッシュにある場合はそれを返す
                if (response) {
                    return response;
                }

                // ネットワークから取得を試行
                return fetch(event.request).then(response => {
                    // 正常なレスポンスでない場合はそのまま返す
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // レスポンスをクローンしてキャッシュに保存
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                }).catch(error => {
                    console.log('🌐 ネットワークエラー:', error);
                    
                    // オフライン時のフォールバック
                    if (event.request.destination === 'document') {
                        return caches.match('./index.html');
                    }
                    
                    return new Response('オフラインです', {
                        status: 503,
                        statusText: 'Service Unavailable',
                        headers: new Headers({
                            'Content-Type': 'text/plain; charset=utf-8'
                        })
                    });
                });
            })
    );
});

// メッセージ処理
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// プッシュ通知（将来的な拡張用）
self.addEventListener('push', event => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body || 'Sommiaからの通知です',
            icon: './sommia.png',
            badge: './assets/images/favicon.ico',
            tag: 'winesupport-notification',
            renotify: true,
            actions: [
                {
                    action: 'open',
                    title: '開く'
                },
                {
                    action: 'close',
                    title: '閉じる'  
                }
            ]
        };

        event.waitUntil(
            self.registration.showNotification('ワイサポ', options)
        );
    }
});

// 通知クリック処理
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'open') {
        event.waitUntil(
            clients.openWindow('./')
        );
    }
});

console.log('🍷 ワイサポ Service Worker が読み込まれました');