/**
 * ヘッダーのお知らせドロップダウンとリンク処理
 */

document.addEventListener('DOMContentLoaded', function() {
    // お知らせドロップダウンのHTML
    const notificationsHTML = `
        <div id="notifications-overlay" class="notifications-overlay">
            <div class="notifications-panel">
                <div class="dropdown-header">
                    <h3>お知らせ</h3>
                    <button class="dropdown-close">&times;</button>
                </div>
                <div class="dropdown-content">
                    <div class="notification-item unread">
                        <div class="notification-icon">🔔</div>
                        <div class="notification-content">
                            <div class="notification-header">
                                <span class="notification-category system">システム</span>
                                <span class="notification-time">2025/05/22 10:30</span>
                            </div>
                            <div class="notification-title">システムメンテナンスのお知らせ</div>
                            <div class="notification-text">5月25日（日）午前2時から5時まで、システムメンテナンスを実施いたします。</div>
                        </div>
                    </div>
                    
                    <div class="notification-item unread">
                        <div class="notification-icon">🎉</div>
                        <div class="notification-content">
                            <div class="notification-header">
                                <span class="notification-category campaign">キャンペーン</span>
                                <span class="notification-time">2025/05/21 15:45</span>
                            </div>
                            <div class="notification-title">夏のワイン特別キャンペーン開始</div>
                            <div class="notification-text">6月1日から7月31日まで、夏にぴったりの白ワインとロゼワインが10%オフ。</div>
                        </div>
                    </div>
                    
                    <div class="notification-item">
                        <div class="notification-icon">🍷</div>
                        <div class="notification-content">
                            <div class="notification-header">
                                <span class="notification-category wine-info">ワイン情報</span>
                                <span class="notification-time">2025/05/20 09:15</span>
                            </div>
                            <div class="notification-title">新ヴィンテージワインが入荷しました</div>
                            <div class="notification-text">2022年ヴィンテージの新しいワインが入荷しました。</div>
                        </div>
                    </div>
                </div>
                <div class="dropdown-footer">
                    <button id="mark-all-read" class="btn btn-sm btn-outline-primary">すべて既読にする</button>
                    <a href="#" class="dropdown-link" id="view-all-link">すべて見る</a>
                </div>
            </div>
        </div>
    `;
    
    // ドロップダウンをbodyに追加
    document.body.insertAdjacentHTML('beforeend', notificationsHTML);
    
    // お知らせアイコンクリックイベント
    const notificationLink = document.querySelector('.notification-link');
    const notificationsOverlay = document.getElementById('notifications-overlay');
    
    if (notificationLink && notificationsOverlay) {
        // クリックでドロップダウン表示
        notificationLink.addEventListener('click', function(e) {
            e.preventDefault();
            notificationsOverlay.classList.toggle('active');
        });
        
        // 閉じるボタンのイベント
        const closeButton = notificationsOverlay.querySelector('.dropdown-close');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                notificationsOverlay.classList.remove('active');
            });
        }
        
        // オーバーレイ外クリックで閉じる
        notificationsOverlay.addEventListener('click', function(e) {
            if (e.target === notificationsOverlay) {
                notificationsOverlay.classList.remove('active');
            }
        });
        
        // すべて既読にするボタンのイベント
        const markAllReadBtn = document.getElementById('mark-all-read');
        if (markAllReadBtn) {
            markAllReadBtn.addEventListener('click', function() {
                const unreadItems = notificationsOverlay.querySelectorAll('.notification-item.unread');
                unreadItems.forEach(item => {
                    item.classList.remove('unread');
                });
                
                // バッジカウントを0にする
                updateNotificationBadge(0);
            });
        }
        
        // 通知アイテムのクリックイベント
        const notificationItems = notificationsOverlay.querySelectorAll('.notification-item');
        notificationItems.forEach(item => {
            item.addEventListener('click', function() {
                // 未読状態を解除
                this.classList.remove('unread');
                
                // バッジカウント更新
                updateNotificationBadge();
                
                // 通知詳細ページへ遷移（実際のアプリでは）
                // window.location.href = 'notification_detail.html?id=xxx';
            });
        });
        
        // すべて見るリンク
        const viewAllLink = document.getElementById('view-all-link');
        if (viewAllLink) {
            viewAllLink.addEventListener('click', function(e) {
                e.preventDefault();
                
                // 現在のパスを取得
                const currentPath = window.location.pathname;
                let targetPath;
                
                // calculateRelativePath関数が存在する場合はそれを使用
                if (typeof calculateRelativePath === 'function') {
                    const relativePath = calculateRelativePath();
                    targetPath = relativePath + 'html/notifications.html';
                } else {
                    // フォールバック：直接パス計算
                    if (currentPath.includes('/html/')) {
                        // htmlディレクトリ内からの場合
                        const pathParts = currentPath.split('/');
                        const htmlIndex = pathParts.indexOf('html');
                        const depth = pathParts.length - htmlIndex - 1; // html以降の深さ
                        
                        if (depth > 1) {
                            // html/subdir/page.html の場合
                            targetPath = '../notifications.html';
                        } else {
                            // html/page.html の場合
                            targetPath = 'notifications.html';
                        }
                    } else {
                        // ルートからの場合
                        targetPath = 'html/notifications.html';
                    }
                }
                
                console.log('Current path:', currentPath);
                console.log('Target path:', targetPath);
                
                // ページ遷移
                window.location.href = targetPath;
            });
        }
    }
});

/**
 * お知らせバッジの更新
 * @param {number} count - バッジカウント（省略時は未読数を数える）
 */
function updateNotificationBadge(count) {
    const badgeElement = document.querySelector('.notification-link .icon-badge');
    
    if (badgeElement) {
        if (count !== undefined) {
            // 指定されたカウントを設定
            badgeElement.textContent = count.toString();
            badgeElement.style.display = count > 0 ? 'flex' : 'none';
        } else {
            // 未読通知数を数える
            const notificationsOverlay = document.getElementById('notifications-overlay');
            if (notificationsOverlay) {
                const unreadCount = notificationsOverlay.querySelectorAll('.notification-item.unread').length;
                badgeElement.textContent = unreadCount.toString();
                badgeElement.style.display = unreadCount > 0 ? 'flex' : 'none';
            }
        }
    }
}

/**
 * デバッグ用：現在のパスと計算されたターゲットパスを表示
 */
function debugPaths() {
    const currentPath = window.location.pathname;
    console.log('=== Path Debug Info ===');
    console.log('Current URL:', window.location.href);
    console.log('Current pathname:', currentPath);
    console.log('Document location:', document.location.pathname);
    console.log('=======================');
}