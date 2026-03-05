document.addEventListener('DOMContentLoaded', () => {
    // ---- i18n Dictionary ----
    const i18n = {
        'en': {
            nav_daybook: 'Day Book',
            nav_inventory: 'Inventory',
            nav_khata: 'Khata Details',
            col_details: 'Details',
            col_category: 'Category',
            col_outgoing: 'Outgoing (₨)',
            col_incoming: 'Incoming (₨)',
            col_date: 'Date',
            col_actions: 'Actions',
            col_pname: 'Product Name',
            col_stock_in: 'Stock In',
            col_stock_out: 'Stock Out',
            col_balance: 'Remaining Stock',
            col_client: 'Client / Party',
            col_notes: 'Notes',
            col_debit: 'Debit (Out)',
            col_credit: 'Credit (In)',
            mod_edit_inv: 'Edit Inventory Item',
            mod_add_inv: 'Add Inventory Item',
            mod_edit_kha: 'Edit Khata Entry',
            mod_add_kha: 'Add Khata Entry',
            mod_edit_day: 'Edit Daybook Entry',
            mod_add_day: 'Add Daybook Entry',
            lbl_date: 'Date',
            lbl_pname: 'Product Name',
            lbl_type: 'Type',
            lbl_qty: 'Quantity',
            lbl_client: 'Client / Party Name',
            lbl_amt: 'Amount (₨)',
            lbl_balance: 'Net Stock',
            lbl_unit: 'Unit',
            lbl_price: 'Price per Unit',
            lbl_total_purch: 'Total Purchase Value',
            lbl_total_sale: 'Total Sale Value',
            lbl_profit: 'Net Profit (Nafa)',
            lbl_notes: 'Notes (Optional)',
            lbl_details: 'Details',
            lbl_cat: 'Category',
            btn_cancel: 'Cancel',
            btn_save: 'Save Entry',
            cat_in: 'Stock In',
            cat_out: 'Stock Out',
            no_data: 'No data found. Add a new entry to get started.',
            opt_in: 'Stock IN (Purchase)',
            opt_out: 'Stock OUT (Sale)',
            opt_dr: 'Debit (You Gave)',
            opt_cr: 'Credit (You Received)',
            opt_inc: 'Incoming (Sale/Receipt)',
            opt_outg: 'Outgoing (Purchase/Payment)',
            opt_sel: 'Select Category',
            opt_gen: 'General',
            opt_fert: 'Fertilizer',
            opt_seed: 'Seeds',
            opt_exp: 'Expense',
            opt_pay: 'Payment Recvd',
            opt_sale: 'Sale',
            opt_purch: 'Purchase',
            tab_wheat: 'Wheat',
            tab_rice: 'Rice',
            tab_till: 'Till',
            tab_sarsu: 'Sarsu',
            tab_others: 'Others',
            opt_kg: 'kg',
            opt_mn: 'mn (40kg)',
            col_unit: 'Unit',
            col_price: 'Price',
            col_total: 'Total (₨)'
        },
        'ur': {
            nav_daybook: 'روزنامچہ',
            nav_inventory: 'مال کی تفصیل',
            nav_khata: 'کھاتہ',
            col_details: 'تفصیل',
            col_category: 'زمرہ',
            col_outgoing: 'نام (₨)',
            col_incoming: 'جمع (₨)',
            col_date: 'تاریخ',
            col_actions: 'عمل',
            col_pname: 'پراڈکٹ کا نام',
            col_stock_in: 'سٹاک وصول',
            col_stock_out: 'سٹاک خروج',
            col_balance: 'باقی سٹاک',
            col_client: 'پارٹی کا نام',
            col_notes: 'تفصیل',
            col_debit: 'نام',
            col_credit: 'جمع',
            mod_edit_inv: 'ترمیم کریں',
            mod_add_inv: 'مال درج کریں',
            mod_edit_kha: 'ترمیم کریں',
            mod_add_kha: 'کھاتہ درج کریں',
            mod_edit_day: 'ترمیم کریں',
            mod_add_day: 'روزنامچہ درج کریں',
            lbl_date: 'تاریخ',
            lbl_pname: 'پراڈکٹ کا نام',
            lbl_type: 'قسم',
            lbl_qty: 'مقدار',
            lbl_client: 'پارٹی کا نام',
            lbl_amt: 'رقم (₨)',
            lbl_balance: 'کل سٹاک',
            lbl_unit: 'اکائی',
            lbl_price: 'فی اکائی قیمت',
            lbl_total_purch: 'کل قیمت خرید',
            lbl_total_sale: 'کل قیمت فروخت',
            lbl_profit: 'خالص منافع (نفع)',
            lbl_notes: 'تفصیل (اختیاری)',
            lbl_details: 'تفصیل',
            lbl_cat: 'زمرہ',
            btn_cancel: 'منسوخ',
            btn_save: 'محفوظ کریں',
            cat_in: 'سٹاک وصول',
            cat_out: 'سٹاک خروج',
            no_data: 'کوئی ریکارڈ نہیں ملا۔ نیا اندراج کریں۔',
            opt_in: 'سٹاک وصول (خرید)',
            opt_out: 'سٹاک خروج (فروخت)',
            opt_dr: 'نام (آپ نے دیا)',
            opt_cr: 'جمع (آپ نے لیا)',
            opt_inc: 'آمدن (فروخت/وصولی)',
            opt_outg: 'خرچ (خرید/ادائیگی)',
            opt_sel: 'زمرہ منتخب کریں',
            opt_gen: 'جنرل',
            opt_fert: 'کھاد',
            opt_seed: 'بیج',
            opt_exp: 'خرچہ',
            opt_pay: 'ادائیگی',
            opt_sale: 'فروخت',
            opt_purch: 'خریداری',
            tab_wheat: 'گندم',
            tab_rice: 'چاول',
            tab_till: 'تل',
            tab_sarsu: 'سرجوں',
            tab_others: 'دوسرے',
            opt_kg: 'کلو',
            opt_mn: 'من',
            col_unit: 'اکائی',
            col_price: 'قیمت',
            col_total: 'کل رقم (₨)'
        }
    };

    window.currentLang = 'en';

    function getStr(key) {
        return i18n[window.currentLang][key] || key;
    }

    function updateLanguage() {
        const langBtn = document.getElementById('lang-btn');
        if (langBtn) {
            langBtn.textContent = window.currentLang === 'en' ? 'اردو' : 'English';
        }

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (i18n[window.currentLang][key]) {
                el.textContent = i18n[window.currentLang][key];
            }
        });

        document.querySelectorAll('[data-i18n-options] option').forEach(opt => {
            const key = opt.getAttribute('data-i18n');
            if (key && i18n[window.currentLang][key]) {
                opt.textContent = i18n[window.currentLang][key];
            }
        });

        if (currentPage) {
            switchPage('nav-' + currentPage);
        }
    }

    // Toggle Button Hook
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            window.currentLang = window.currentLang === 'en' ? 'ur' : 'en';
            updateLanguage();
        });
    }

    // ---- DOM Elements ----
    const sidebar = document.getElementById('sidebar');
    const menuOpenBtn = document.getElementById('menu-open');
    const menuCloseBtn = document.getElementById('menu-close');
    const tbody = document.getElementById('transaction-tbody');

    // Modal Elements
    const addEntryBtn = document.querySelector('.btn-primary i.fa-plus')?.parentElement;
    const entryModal = document.getElementById('entry-modal');
    const closeBtns = document.querySelectorAll('.close-modal');
    const entryForm = document.getElementById('entry-form');

    // ---- Authentication Elements ----
    const authSection = document.getElementById('auth-section');
    const mainApp = document.getElementById('main-app');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const showSignupBtn = document.getElementById('show-signup');
    const showLoginBtn = document.getElementById('show-login');
    const logoutBtn = document.getElementById('logout-btn');
    const headerLogoutBtn = document.getElementById('header-logout-btn');
    const loginError = document.getElementById('login-error');
    const signupError = document.getElementById('signup-error');

    // Auth State
    let authToken = localStorage.getItem('authToken');
    let currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

    // ---- API Logic & Fetch ----
    const origin = window.location.origin;
    const API_BASE = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? 'http://localhost:5000/api'
        : `${origin}/api`;

    function checkAuth() {
        if (authToken) {
            authSection.style.display = 'none';
            mainApp.style.display = 'flex';

            // Set profile display name
            const usernameDisplay = document.getElementById('current-username-display');
            if (usernameDisplay && currentUser) {
                usernameDisplay.textContent = currentUser.username;
            }

            const navUsers = document.getElementById('nav-users');
            if (navUsers) {
                navUsers.style.display = (currentUser && currentUser.role === 'admin') ? 'block' : 'none';
            }

            fetchTransactions();
        } else {
            authSection.style.display = 'flex';
            mainApp.style.display = 'none';
        }
    }

    // Toggle Forms
    if (showSignupBtn) showSignupBtn.addEventListener('click', (e) => { e.preventDefault(); loginForm.style.display = 'none'; signupForm.style.display = 'block'; });
    if (showLoginBtn) showLoginBtn.addEventListener('click', (e) => { e.preventDefault(); signupForm.style.display = 'none'; loginForm.style.display = 'block'; });

    // Handle Login
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            loginError.textContent = '';
            const btn = loginForm.querySelector('button');
            btn.textContent = 'Logging in...';
            btn.disabled = true;

            try {
                const response = await fetch(`${API_BASE}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: document.getElementById('login-username').value,
                        password: document.getElementById('login-password').value
                    })
                });
                const data = await response.json();

                if (!response.ok) throw new Error(data.error || 'Login failed');

                authToken = data.token;
                currentUser = { username: data.username, role: data.role };
                localStorage.setItem('authToken', authToken);
                localStorage.setItem('currentUser', JSON.stringify(currentUser));

                checkAuth();
            } catch (err) {
                loginError.textContent = err.message;
            } finally {
                btn.textContent = 'Sign In';
                btn.disabled = false;
            }
        });
    }

    // Handle Signup
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            signupError.textContent = '';
            const btn = signupForm.querySelector('button');
            btn.textContent = 'Creating...';
            btn.disabled = true;

            try {
                const response = await fetch(`${API_BASE}/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': authToken ? `Bearer ${authToken}` : '' // Admin token required unless it's the very first user
                    },
                    body: JSON.stringify({
                        username: document.getElementById('signup-username').value,
                        password: document.getElementById('signup-password').value,
                        role: document.getElementById('signup-role').value
                    })
                });
                const data = await response.json();

                // We only automatically log in if we weren't already logged in
                // (i.e. if Ali is admin creating a user, he shouldn't be suddenly logged out of his admin account)
                if (!authToken) {
                    authToken = data.token;
                    currentUser = { username: data.username, role: data.role };
                    localStorage.setItem('authToken', authToken);
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    checkAuth();
                } else {
                    alert('User created successfully. They can now log in.');
                    signupForm.reset();
                    // Keep Ali logged in on admin account
                }

            } catch (err) {
                signupError.textContent = err.message;
            } finally {
                btn.textContent = 'Create Account';
                btn.disabled = false;
            }
        });
    }

    // ---- Change Password Logic ----
    const pwModal = document.getElementById('password-modal');
    const userProfileBtn = document.getElementById('user-profile-btn');
    const closePwBtn = document.querySelector('.close-pw-modal');
    const pwForm = document.getElementById('password-form');
    const pwError = document.getElementById('pw-error');
    const pwSuccess = document.getElementById('pw-success');

    if (userProfileBtn) {
        userProfileBtn.addEventListener('click', () => {
            pwError.textContent = '';
            pwSuccess.textContent = '';
            if (pwForm) pwForm.reset();
            if (pwModal) pwModal.classList.add('active');
        });
    }

    if (closePwBtn) {
        closePwBtn.addEventListener('click', (e) => {
            e.preventDefault();
            pwModal.classList.remove('active');
        });
    }

    if (pwForm) {
        pwForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            pwError.textContent = '';
            pwSuccess.textContent = '';

            const currentPw = document.getElementById('pw-current').value;
            const newPw = document.getElementById('pw-new').value;
            const confirmPw = document.getElementById('pw-confirm').value;

            if (newPw !== confirmPw) {
                pwError.textContent = 'New passwords do not match!';
                return;
            }

            const btn = pwForm.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'Updating...';
            btn.disabled = true;

            try {
                const response = await fetch(`${API_BASE}/change-password`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    },
                    body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Failed to update password');
                }

                pwSuccess.textContent = 'Password updated successfully!';
                pwForm.reset();
                setTimeout(() => {
                    if (pwModal) pwModal.classList.remove('active');
                    pwSuccess.textContent = '';
                }, 2000);

            } catch (err) {
                pwError.textContent = err.message;
            } finally {
                btn.textContent = originalText;
                btn.disabled = false;
            }
        });
    }

    const performLogout = () => {
        authToken = null;
        currentUser = null;
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        checkAuth();
    };

    if (logoutBtn) {
        logoutBtn.addEventListener('click', performLogout);
    }

    if (headerLogoutBtn) {
        headerLogoutBtn.addEventListener('click', performLogout);
    }

    // ---- Auto Logout Timer (10 Minutes) ----
    let inactivityTime = function () {
        let time;
        const TEN_MINUTES = 10 * 60 * 1000; // 10 minutes in milliseconds

        window.onload = resetTimer;
        // DOM Events
        document.onmousemove = resetTimer;
        document.onkeypress = resetTimer;
        document.onclick = resetTimer;
        document.onscroll = resetTimer;

        function logout() {
            if (authToken) {
                console.log("Auto-logging out due to inactivity...");
                authToken = null;
                currentUser = null;
                localStorage.removeItem('authToken');
                localStorage.removeItem('currentUser');
                checkAuth();
                alert("You have been automatically logged out due to inactivity.");
            }
        }

        function resetTimer() {
            clearTimeout(time);
            time = setTimeout(logout, TEN_MINUTES);
        }
    };

    // Initialize the inactivity timer
    inactivityTime();

    // ---- Sidebar Toggle ----
    if (menuOpenBtn) {
        menuOpenBtn.addEventListener('click', () => {
            sidebar.classList.add('active');
        });
    }

    if (menuCloseBtn) {
        menuCloseBtn.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
    }

    // Close sidebar on outside click (mobile)
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && sidebar && menuOpenBtn) {
            if (!sidebar.contains(e.target) && !menuOpenBtn.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });

    // ---- SPA State & Navigation ----
    let currentPage = 'daybook';
    let currentInventoryCategory = 'wheat'; // Default for inventory

    const navItems = {
        'nav-daybook': { page: 'daybook', title: getStr('nav_daybook'), icon: 'fa-book-open', showStats: true, showFilters: true },
        'nav-inventory': { page: 'inventory', title: getStr('nav_inventory'), icon: 'fa-boxes-stacked', showStats: false, showFilters: false },
        'nav-khata': { page: 'khata', title: getStr('nav_khata'), icon: 'fa-wallet', showStats: true, showFilters: true },
        'nav-reminders': { page: 'reminders', title: 'Reminders', icon: 'fa-bell', showStats: false, showFilters: false },
        'nav-users': { page: 'users', title: 'Users List', icon: 'fa-users', showStats: false, showFilters: false }
    };

    const dashboardStats = document.getElementById('dashboard-stats');
    const dateFilters = document.getElementById('date-filters');
    const pageTitleText = document.getElementById('page-name');
    const pageTitleIcon = document.getElementById('page-icon');
    const inventoryTabs = document.getElementById('inventory-tabs');
    const inventorySummary = document.getElementById('inventory-summary');

    function switchPage(navId) {
        if (!navItems[navId]) return;

        const config = navItems[navId];
        currentPage = config.page; // Map abstract sidebar items to their API logic

        // Update Sidebar Active Class
        document.querySelectorAll('.sidebar-nav li').forEach(li => li.classList.remove('active'));
        document.getElementById(navId).classList.add('active');

        // Update Header
        if (pageTitleText) pageTitleText.textContent = config.title;
        if (pageTitleIcon) pageTitleIcon.className = `fa-solid ${config.icon}`;

        // Toggle Sections
        if (dashboardStats) dashboardStats.style.display = config.showStats ? 'grid' : 'none';
        if (dateFilters) dateFilters.style.visibility = config.showFilters ? 'visible' : 'hidden';
        if (inventoryTabs) inventoryTabs.style.display = currentPage === 'inventory' ? 'flex' : 'none';
        if (inventorySummary) inventorySummary.style.display = currentPage === 'inventory' ? 'grid' : 'none';

        if (addEntryBtn) {
            addEntryBtn.style.display = currentPage === 'users' ? 'none' : 'block';
        }

        // Update Table Headers
        const thead = document.querySelector('.data-table thead tr');
        if (thead) {
            const isAdmin = currentUser && currentUser.role === 'admin';
            const ownerHeader = isAdmin ? `<th>Owner</th>` : '';

            if (currentPage === 'inventory') {
                thead.innerHTML = `
                    <th data-i18n="col_pname">${getStr('col_pname')}</th>
                    ${ownerHeader}
                    <th data-i18n="col_category">${getStr('col_category')}</th>
                    <th class="amount-col" data-i18n="col_stock_in">${getStr('col_stock_in')}</th>
                    <th class="amount-col" data-i18n="col_stock_out">${getStr('col_stock_out')}</th>
                    <th data-i18n="col_unit">${getStr('col_unit')}</th>
                    <th class="amount-col" data-i18n="col_price">${getStr('col_price')}</th>
                    <th class="amount-col" data-i18n="col_total">${getStr('col_total')}</th>
                    <th class="amount-col" data-i18n="col_balance">${getStr('col_balance')}</th>
                    <th data-i18n="col_date">${getStr('col_date')}</th>
                    <th data-i18n="col_actions">${getStr('col_actions')}</th>
                `;
            } else if (currentPage === 'khata') {
                thead.innerHTML = `
                    <th data-i18n="col_client">${getStr('col_client')}</th>
                    ${ownerHeader}
                    <th data-i18n="col_notes">${getStr('col_notes')}</th>
                    <th class="amount-col" data-i18n="col_debit">${getStr('col_debit')}</th>
                    <th class="amount-col" data-i18n="col_credit">${getStr('col_credit')}</th>
                    <th data-i18n="col_date">${getStr('col_date')}</th>
                    <th data-i18n="col_actions">${getStr('col_actions')}</th>
                `;
            } else if (currentPage === 'users') {
                thead.innerHTML = `
                    <th>Username</th>
                    <th>Role</th>
                    <th>Password (Admin View)</th>
                    <th>Joined At</th>
                    <th>Actions</th>
                `;
            } else if (currentPage === 'reminders') {
                thead.innerHTML = `
                    <th>Title</th>
                    <th>Message</th>
                    <th>Time</th>
                    <th>Repeat</th>
                    <th>Status</th>
                    <th>Actions</th>
                `;
            } else {
                thead.innerHTML = `
                    <th data-i18n="col_details">${getStr('col_details')}</th>
                    ${ownerHeader}
                    <th data-i18n="col_category">${getStr('col_category')}</th>
                    <th class="amount-col" data-i18n="col_outgoing">${getStr('col_outgoing')}</th>
                    <th class="amount-col" data-i18n="col_incoming">${getStr('col_incoming')}</th>
                    <th data-i18n="col_date">${getStr('col_date')}</th>
                    <th data-i18n="col_actions">${getStr('col_actions')}</th>
                `;
            }
        }

        // Fetch new data
        fetchTransactions();

        // Close mobile sidebar if open
        if (window.innerWidth <= 768 && sidebar) {
            sidebar.classList.remove('active');
        }
    }

    // Attach click events to nav links
    Object.keys(navItems).forEach(navId => {
        const li = document.getElementById(navId);
        if (li) {
            li.addEventListener('click', (e) => {
                e.preventDefault();
                switchPage(navId);
            });
        }
    });

    // ---- Inventory Tab Switching ----
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentInventoryCategory = btn.getAttribute('data-tab');
            fetchTransactions();
        });
    });

    // ---- Edit/Delete State & Modal Logic ----
    let editingId = null;

    function buildForm() {
        if (currentPage === 'inventory') {
            document.querySelector('.modal-header h2').textContent = editingId ? getStr('mod_edit_inv') : getStr('mod_add_inv');
            entryForm.innerHTML = `
                <div class="form-group">
                    <label>${getStr('lbl_date')}</label>
                    <input type="date" required value="${new Date().toISOString().split('T')[0]}">
                </div>
                <div class="form-group">
                    <label>${getStr('lbl_pname')}</label>
                    <input type="text" placeholder="E.g. DAP Fertilizer" required>
                </div>
                <div class="form-group">
                    <label>${getStr('lbl_type')}</label>
                    <select required id="entry-type">
                        <option value="in">${getStr('opt_in')}</option>
                        <option value="out">${getStr('opt_out')}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>${getStr('lbl_qty')}</label>
                    <input type="number" placeholder="0" required>
                </div>
                <div class="form-group">
                    <label>${getStr('lbl_unit')}</label>
                    <select required>
                        <option value="kg">${getStr('opt_kg')}</option>
                        <option value="mn">${getStr('opt_mn')}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>${getStr('lbl_price')}</label>
                    <input type="number" step="0.01" placeholder="0.00">
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-secondary close-modal">${getStr('btn_cancel')}</button>
                    <button type="submit" class="btn-primary">${getStr('btn_save')}</button>
                </div>
            `;
        } else if (currentPage === 'khata') {
            document.querySelector('.modal-header h2').textContent = editingId ? getStr('mod_edit_kha') : getStr('mod_add_kha');
            entryForm.innerHTML = `
                <div class="form-group">
                    <label>${getStr('lbl_date')}</label>
                    <input type="date" required value="${new Date().toISOString().split('T')[0]}">
                </div>
                <div class="form-group">
                    <label>${getStr('lbl_client')}</label>
                    <input type="text" placeholder="E.g. Ali Farmer" required>
                </div>
                <div class="form-group">
                    <label>${getStr('lbl_type')}</label>
                    <select required id="entry-type">
                        <option value="debit">${getStr('opt_dr')}</option>
                        <option value="credit">${getStr('opt_cr')}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>${getStr('lbl_amt')}</label>
                    <input type="number" placeholder="0" required>
                </div>
                <div class="form-group">
                    <label>${getStr('lbl_notes')}</label>
                    <input type="text" placeholder="Bag details, etc.">
                </div>
                <div class="form-group" style="padding: 12px; background: rgba(16, 185, 129, 0.05); border-radius: 8px; border: 1px dashed var(--primary); margin-top: 10px;">
                    <label style="color: var(--primary); font-weight: bold; margin-bottom: 8px;"><i class="fa-solid fa-bell"></i> Set Reminder (Optional)</label>
                    <div style="display: flex; gap: 10px;">
                        <input type="date" id="khata-rm-date" style="flex: 1;">
                        <input type="time" id="khata-rm-time" style="flex: 1;">
                    </div>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-secondary close-modal">${getStr('btn_cancel')}</button>
                    <button type="submit" class="btn-primary">${getStr('btn_save')}</button>
                </div>
            `;
        } else {
            // Default Daybook Form
            document.querySelector('.modal-header h2').textContent = editingId ? getStr('mod_edit_day') : getStr('mod_add_day');
            entryForm.innerHTML = `
                <div class="form-group">
                    <label>${getStr('lbl_date')}</label>
                    <input type="date" required value="${new Date().toISOString().split('T')[0]}">
                </div>
                <div class="form-group">
                    <label>${getStr('lbl_details')}</label>
                    <input type="text" placeholder="Enter transaction details..." required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>${getStr('lbl_cat')}</label>
                        <select required>
                            <option value="">${getStr('opt_sel')}</option>
                            <option value="sale">${getStr('opt_sale')}</option>
                            <option value="purchase">${getStr('opt_purch')}</option>
                            <option value="expense">${getStr('opt_exp')}</option>
                            <option value="payment">${getStr('opt_pay')}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>${getStr('lbl_type')}</label>
                        <select required id="entry-type">
                            <option value="incoming">${getStr('opt_inc')}</option>
                            <option value="outgoing">${getStr('opt_outg')}</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>${getStr('lbl_amt')}</label>
                    <input type="number" placeholder="0" required>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-secondary close-modal">${getStr('btn_cancel')}</button>
                    <button type="submit" class="btn-primary">${getStr('btn_save')}</button>
                </div>
            `;
        }

        // Re-attach close listener for the newly injected Cancel button
        const dynamicCancel = entryForm.querySelector('.close-modal');
        if (dynamicCancel) {
            dynamicCancel.addEventListener('click', (e) => {
                e.preventDefault();
                entryModal.classList.remove('active');
                resetModal();
            });
        }
    }

    if (addEntryBtn) {
        addEntryBtn.addEventListener('click', () => {
            editingId = null;
            buildForm(); // Dynamically rewrite the form HTML based on current active tab
            entryModal.classList.add('active');
        });
    }

    // Reset editing state on close
    const resetModal = () => {
        editingId = null;
        if (entryForm) entryForm.reset();
    };

    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            entryModal.classList.remove('active');
            resetModal();
        });
    });

    entryModal.addEventListener('click', (e) => {
        if (e.target === entryModal) {
            entryModal.classList.remove('active');
            resetModal();
        }
    });

    // ---- API Logic & Fetch ----

    let transactions = [];

    async function fetchTransactions() {
        if (!authToken) return; // Don't fetch if not logged in

        try {
            let endpoint = `${API_BASE}/transactions`;
            if (currentPage === 'inventory') endpoint = `${API_BASE}/inventory`;
            if (currentPage === 'khata') endpoint = `${API_BASE}/khata`;
            if (currentPage === 'users') endpoint = `${API_BASE}/users`;
            if (currentPage === 'reminders') endpoint = `${API_BASE}/reminders`;

            const response = await fetch(endpoint, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    // Token expired or invalid
                    logoutBtn.click();
                    throw new Error('Session expired');
                }
                throw new Error('Failed to fetch data from database');
            }

            let data = await response.json();

            // Client-side filtering for Inventory categories
            if (currentPage === 'inventory') {
                transactions = data.filter(t => t.category === currentInventoryCategory);
            } else {
                transactions = data;
            }

            renderTransactions();

            if (currentPage === 'daybook' || currentPage === 'khata' || currentPage === 'inventory') {
                updateStats();
            }
        } catch (error) {
            console.error(`Error fetching ${currentPage}:`, error);
        }
    }

    // ---- Form Submit Hook ----
    if (entryForm) {
        entryForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            let entryData = {};
            let endpoint = `${API_BASE}/transactions`;

            // Gather data based on current page
            if (currentPage === 'inventory') {
                endpoint = `${API_BASE}/inventory`;
                const inputs = entryForm.querySelectorAll('input, select');
                const type = inputs[2].value;
                let qty = Number(inputs[3].value);
                const unit = inputs[4].value;

                // mn to kg conversion for stock maintenance
                const storedQty = (unit === 'mn') ? (qty * 40) : qty;

                entryData = {
                    date: inputs[0].value,
                    product_name: inputs[1].value,
                    category: currentInventoryCategory,
                    stock_in: type === 'in' ? storedQty : 0,
                    stock_out: type === 'out' ? storedQty : 0,
                    unit: unit,
                    price: Number(inputs[5].value || 0)
                };
            } else if (currentPage === 'khata') {
                endpoint = `${API_BASE}/khata`;
                const inputs = entryForm.querySelectorAll('input, select');
                const type = inputs[2].value;
                const amt = Number(inputs[3].value);
                entryData = {
                    date: inputs[0].value,
                    client_name: inputs[1].value,
                    notes: inputs[4].value,
                    debit: type === 'debit' ? amt : 0,
                    credit: type === 'credit' ? amt : 0
                };
            } else {
                // Daybook
                const inputs = entryForm.querySelectorAll('input, select');
                entryData = {
                    date: inputs[0].value,
                    details: inputs[1].value,
                    category: inputs[2].value,
                    type: inputs[3].value,
                    amount: Number(inputs[4].value)
                };
            }

            try {
                let response;
                if (editingId) {
                    response = await fetch(`${endpoint}/${editingId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${authToken}`
                        },
                        body: JSON.stringify(entryData)
                    });
                } else {
                    response = await fetch(endpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${authToken}`
                        },
                        body: JSON.stringify(entryData)
                    });
                }

                if (!response.ok) throw new Error('Failed to save to database');

                // ---- Handle Optional Reminder in Khata ----
                if (currentPage === 'khata') {
                    const rmDate = document.getElementById('khata-rm-date');
                    const rmTime = document.getElementById('khata-rm-time');
                    if (rmDate && rmTime && rmDate.value && rmTime.value) {
                        const remind_at = `${rmDate.value} ${rmTime.value}:00`;
                        const clientName = entryForm.querySelectorAll('input, select')[1].value;
                        const typeInput = entryForm.querySelectorAll('input, select')[2].value;
                        const amtInput = entryForm.querySelectorAll('input, select')[3].value;
                        const entryTypeStr = typeInput === 'debit' ? 'Dr' : 'Cr';

                        const remindPayload = {
                            title: `Khata Reminder: ${clientName}`,
                            description: `Amount: Rs ${amtInput} (${entryTypeStr})`,
                            remind_at: remind_at,
                            repeat_type: 'none',
                            is_completed: false
                        };

                        try {
                            await fetch(`${API_BASE}/reminders`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${authToken}`
                                },
                                body: JSON.stringify(remindPayload)
                            });
                            if (typeof scheduleNotifications === 'function') scheduleNotifications();
                        } catch (err) {
                            console.error("Failed to simultaneously save Khata reminder:", err);
                        }
                    }
                }

                entryModal.classList.remove('active');

                // Reset state
                editingId = null;
                entryForm.reset();

                // Reload transaction table
                fetchTransactions();
            } catch (error) {
                console.error("Error saving transaction:", error);
                alert("Error saving transaction. Please check server connection.");
            }
        });
    }

    // ---- Reminders Modal & Logic ----
    const reminderModal = document.getElementById('reminder-modal');
    const reminderForm = document.getElementById('reminder-form');
    const headerRemindersBtn = document.getElementById('header-reminders-btn');
    const closeReminderBtns = document.querySelectorAll('.close-reminder-modal');
    let editingReminderId = null;

    if (headerRemindersBtn) {
        headerRemindersBtn.addEventListener('click', () => {
            switchPage('nav-reminders');
        });
    }

    if (addEntryBtn) {
        const oldAddEntryListener = addEntryBtn.onclick;
        addEntryBtn.addEventListener('click', (e) => {
            if (currentPage === 'reminders') {
                e.stopImmediatePropagation();
                editingReminderId = null;
                if (reminderForm) reminderForm.reset();
                if (reminderModal) reminderModal.classList.add('active');
            }
        });
    }

    closeReminderBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (reminderModal) reminderModal.classList.remove('active');
            editingReminderId = null;
        });
    });

    if (reminderForm) {
        reminderForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const title = document.getElementById('rm-title').value;
            const desc = document.getElementById('rm-desc').value;
            const date = document.getElementById('rm-date').value;
            const time = document.getElementById('rm-time').value;
            const repeat = document.getElementById('rm-repeat').value;

            // Combine date and time
            const remind_at = `${date} ${time}:00`;

            const payload = { title, description: desc, remind_at, repeat_type: repeat, is_completed: false };

            try {
                let res;
                if (editingReminderId) {
                    res = await fetch(`${API_BASE}/reminders/${editingReminderId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${authToken}`
                        },
                        body: JSON.stringify(payload)
                    });
                } else {
                    res = await fetch(`${API_BASE}/reminders`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${authToken}`
                        },
                        body: JSON.stringify(payload)
                    });
                }

                if (!res.ok) throw new Error('Failed to save reminder');
                reminderModal.classList.remove('active');
                editingReminderId = null;
                reminderForm.reset();
                if (currentPage === 'reminders') fetchTransactions();

                // Re-init notifications (will define soon)
                if (typeof scheduleNotifications === 'function') scheduleNotifications();
            } catch (err) {
                console.error("Error saving reminder:", err);
                alert("Failed to save reminder.");
            }
        });
    }

    // ---- Global Reminder Actions ----
    window.deleteReminder = async (id) => {
        if (!confirm("Are you sure you want to delete this reminder?")) return;
        try {
            const res = await fetch(`${API_BASE}/reminders/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${authToken}` }
            });
            if (!res.ok) throw new Error('Failed to delete reminder');
            fetchTransactions();
            if (typeof scheduleNotifications === 'function') scheduleNotifications();
        } catch (error) {
            console.error(error);
            alert("Error deleting reminder.");
        }
    };

    window.editReminder = (id) => {
        const row = transactions.find(t => t.id === id);
        if (!row) return;

        editingReminderId = id;

        // Parse the DATETIME format from the DB (e.g. 2024-03-05T10:30:00.000Z)
        const dt = new Date(row.remind_at);
        // Adjust for local time zone to populate inputs correctly
        const localDate = dt.toLocaleDateString('en-CA'); // YYYY-MM-DD format
        const localTime = dt.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

        document.getElementById('rm-title').value = row.title;
        document.getElementById('rm-desc').value = row.description;
        document.getElementById('rm-date').value = localDate;
        document.getElementById('rm-time').value = localTime;
        document.getElementById('rm-repeat').value = row.repeat_type;

        reminderModal.classList.add('active');
    };

    // ---- Global Actions for Buttons generated in HTML string ----
    window.deleteTransaction = async (id) => {
        if (!confirm("Are you sure you want to delete this entry?")) return;
        try {
            let endpoint = `${API_BASE}/transactions`;
            if (currentPage === 'inventory') endpoint = `${API_BASE}/inventory`;
            if (currentPage === 'khata') endpoint = `${API_BASE}/khata`;

            const response = await fetch(`${endpoint}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (!response.ok) throw new Error('Failed to delete');
            fetchTransactions();
        } catch (error) {
            console.error("Error deleting:", error);
            alert("Failed to delete the entry.");
        }
    };

    window.editTransaction = (id) => {
        const row = transactions.find(t => t.id === id);
        if (!row) return;

        editingId = id;
        buildForm(); // Dynamically set form to current page layout before populating!

        // Format Date
        const dateObj = new Date(row.date);
        const yyyy = dateObj.getFullYear();
        const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
        const dd = String(dateObj.getDate()).padStart(2, '0');
        const dStr = `${yyyy}-${mm}-${dd}`;

        const inputs = entryForm.querySelectorAll('input, select');

        if (currentPage === 'inventory') {
            inputs[0].value = dStr;
            inputs[1].value = row.product_name;
            const isStockIn = Number(row.stock_in) > 0;
            const storedQty = isStockIn ? Number(row.stock_in) : Number(row.stock_out);
            const unit = row.unit || 'kg';

            // Convert back to original unit for display in form
            const displayQty = (unit === 'mn') ? (storedQty / 40) : storedQty;

            inputs[2].value = isStockIn ? 'in' : 'out';
            inputs[3].value = displayQty;
            inputs[4].value = unit;
            inputs[5].value = row.price || 0;
        } else if (currentPage === 'khata') {
            inputs[0].value = dStr;
            inputs[1].value = row.client_name;
            inputs[2].value = row.debit > 0 ? 'debit' : 'credit';
            inputs[3].value = row.debit > 0 ? row.debit : row.credit;
            inputs[4].value = row.notes;
        } else {
            inputs[0].value = dStr;
            inputs[1].value = row.details;
            inputs[2].value = row.category;
            inputs[3].value = row.type;
            inputs[4].value = row.amount;
        }

        entryModal.classList.add('active');
    };

    // ---- Data Rendering ----
    function renderTransactions() {
        if (!tbody) return;
        tbody.innerHTML = '';

        if (transactions.length === 0) {
            const colCount = (currentPage === 'inventory') ? 10 : 6;
            tbody.innerHTML = `<tr><td colspan="${colCount}" style="text-align: center; color: var(--text-muted);">${getStr('no_data')}</td></tr>`;
            return;
        }

        // Pre-calculate current total for inventory running balance and financial summary
        let balanceTracker = 0;
        let totalPurchases = 0;
        let totalSales = 0;

        if (currentPage === 'inventory') {
            transactions.forEach(t => {
                const stockIn = Number(t.stock_in || 0);
                const stockOut = Number(t.stock_out || 0);
                const price = Number(t.price || 0);
                const unit = t.unit || 'kg';

                // Calculate stock balance
                balanceTracker += (stockIn - stockOut);

                // Calculate financial totals
                const qtyOriginal = (unit === 'mn') ? (Math.max(stockIn, stockOut) / 40) : Math.max(stockIn, stockOut);
                const itemTotal = qtyOriginal * price;

                if (stockIn > 0) totalPurchases += itemTotal;
                else if (stockOut > 0) totalSales += itemTotal;
            });

            // Update Financial Summary UI
            if (inventorySummary) {
                const profit = totalSales - totalPurchases;
                inventorySummary.innerHTML = `
                    <div class="summary-card purchase">
                        <span class="label">${getStr('lbl_total_purch')}</span>
                        <span class="value">₨ ${totalPurchases.toLocaleString('en-PK', { minimumFractionDigits: 2 })}</span>
                        <div class="trend"><i class="fa-solid fa-cart-shopping"></i></div>
                    </div>
                    <div class="summary-card sale">
                        <span class="label">${getStr('lbl_total_sale')}</span>
                        <span class="value">₨ ${totalSales.toLocaleString('en-PK', { minimumFractionDigits: 2 })}</span>
                        <div class="trend"><i class="fa-solid fa-cash-register"></i></div>
                    </div>
                    <div class="summary-card profit">
                        <span class="label">${getStr('lbl_profit')}</span>
                        <span class="value">₨ ${profit.toLocaleString('en-PK', { minimumFractionDigits: 2 })}</span>
                        <div class="trend"><i class="fa-solid fa-chart-line"></i> ${profit >= 0 ? '+' : ''}${profit.toLocaleString('en-PK')}</div>
                    </div>
                `;
            }
        }

        transactions.forEach(row => {
            const tr = document.createElement('tr');
            const displayDate = new Date(row.date).toLocaleDateString('en-GB');
            const isAdmin = currentUser && currentUser.role === 'admin';
            const ownerBadge = isAdmin ? `<td><span class="badge badge-secondary" style="background:#f3f4f6; color:#374151;">👤 ${row.owner_name || 'Unknown'}</span></td>` : '';

            if (currentPage === 'inventory') {
                const storedStockIn = Number(row.stock_in || 0);
                const storedStockOut = Number(row.stock_out || 0);
                const unit = row.unit || 'kg';
                const price = Number(row.price || 0);

                // Convert back from storage (kg) to display unit for the "Price * Qty" math
                const qtyOriginal = (unit === 'mn') ? (Math.max(storedStockIn, storedStockOut) / 40) : Math.max(storedStockIn, storedStockOut);
                const totalAmount = qtyOriginal * price;

                const unitDisplay = unit === 'mn' ? getStr('opt_mn') : getStr('opt_kg');
                const priceDisplay = price.toLocaleString('en-PK', { minimumFractionDigits: 2 });
                const totalDisplay = totalAmount.toLocaleString('en-PK', { minimumFractionDigits: 2 });

                const typeDisplay = storedStockIn > 0 ? getStr('cat_in') : getStr('cat_out');
                const badgeClass = storedStockIn > 0 ? 'badge badge-success' : 'badge badge-warning';

                const currentBalance = balanceTracker;
                // Prepare for next row (which is older in the DESC order)
                balanceTracker -= (storedStockIn - storedStockOut);

                tr.innerHTML = `
                    <td><strong>${row.product_name}</strong></td>
                    ${ownerBadge}
                    <td><span class="${badgeClass}">${typeDisplay}</span></td>
                    <td class="amount-col text-success">${storedStockIn.toLocaleString('en-PK')}</td>
                    <td class="amount-col text-danger">${storedStockOut.toLocaleString('en-PK')}</td>
                    <td>${unitDisplay}</td>
                    <td class="amount-col">₨ ${priceDisplay}</td>
                    <td class="amount-col" style="font-weight: bold; color: var(--text-main);">₨ ${totalDisplay}</td>
                    <td class="amount-col" style="font-weight: bold; color: var(--primary);">${currentBalance.toLocaleString('en-PK')}</td>
                    <td>${displayDate}</td>
                    <td>
                        <button class="action-btn edit" onclick="editTransaction(${row.id})" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="action-btn delete" onclick="deleteTransaction(${row.id})" title="Delete"><i class="fa-solid fa-trash"></i></button>
                    </td>
                `;
            } else if (currentPage === 'khata') {
                tr.innerHTML = `
                    <td><strong>${row.client_name}</strong></td>
                    ${ownerBadge}
                    <td><span class="text-muted">${row.notes || '-'}</span></td>
                    <td class="amount-col text-danger">${Number(row.debit).toLocaleString('en-PK')}</td>
                    <td class="amount-col text-success">${Number(row.credit).toLocaleString('en-PK')}</td>
                    <td>${displayDate}</td>
                    <td>
                        <button class="action-btn edit" onclick="editTransaction(${row.id})" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="action-btn delete" onclick="deleteTransaction(${row.id})" title="Delete"><i class="fa-solid fa-trash"></i></button>
                    </td>
                `;
            } else if (currentPage === 'users') {
                // Formatting for the users table
                const createdDate = new Date(row.created_at).toLocaleDateString('en-GB');
                const roleBadge = row.role === 'admin' ? '<span class="badge badge-warning">Admin</span>' : '<span class="badge badge-success">User</span>';

                tr.innerHTML = `
                    <td><strong>${row.username}</strong></td>
                    <td>${roleBadge}</td>
                    <td><code style="background:var(--bg-light); padding:3px 6px; border-radius:4px;">${row.password}</code></td>
                    <td>${createdDate}</td>
                    <td>
                        <!-- Read-only view, delete could be added later if needed -->
                        <span class="text-muted" style="font-size: 13px;">N/A</span>
                    </td>
                `;
            } else if (currentPage === 'reminders') {
                const remindAtLocal = new Date(row.remind_at).toLocaleString('en-GB', {
                    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                });

                const repBadge = row.repeat_type !== 'none' ? `<span class="badge badge-secondary" style="background:#e0e7ff; color:#4f46e5;"><i class="fa-solid fa-rotate"></i> ${row.repeat_type}</span>` : '<span class="text-muted">-</span>';
                const statusBadge = row.is_completed ? '<span class="badge badge-success">Completed</span>' : '<span class="badge badge-warning">Pending</span>';

                tr.innerHTML = `
                    <td><strong>${row.title}</strong></td>
                    <td><span class="text-muted" style="font-size: 0.9em; display: inline-block; max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${row.description || ''}">${row.description || '-'}</span></td>
                    <td>${remindAtLocal}</td>
                    <td>${repBadge}</td>
                    <td>${statusBadge}</td>
                    <td>
                        <button class="action-btn edit" onclick="editReminder(${row.id})" title="Edit">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="action-btn delete" onclick="deleteReminder(${row.id})" title="Delete">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                `;
            } else {
                // Daybook view
                const categoryRaw = row.category || 'general';
                const typeRaw = row.type || 'incoming';

                const incomingStr = typeRaw === 'incoming' ? `<span class="text-success">${Number(row.amount || 0).toLocaleString('en-PK', { minimumFractionDigits: 2 })}</span>` : '-';
                const outgoingStr = typeRaw === 'outgoing' ? `<span class="text-danger">${Number(row.amount || 0).toLocaleString('en-PK', { minimumFractionDigits: 2 })}</span>` : '-';

                let badgeClass = 'badge';
                if (categoryRaw.toLowerCase() === 'expense') badgeClass += ' badge-warning';
                else badgeClass += ' badge-success';

                const mapping = { sale: getStr('opt_sale'), purchase: getStr('opt_purch'), general: getStr('opt_gen'), fertilizer: getStr('opt_fert'), seeds: getStr('opt_seed'), expense: getStr('opt_exp'), payment: getStr('opt_pay') };
                const catDisplay = mapping[categoryRaw] || (categoryRaw.charAt(0).toUpperCase() + categoryRaw.slice(1));

                tr.innerHTML = `
                    <td><strong>${row.details || '-'}</strong></td>
                    ${ownerBadge}
                    <td><span class="${badgeClass}">${catDisplay}</span></td>
                    <td class="amount-col">${outgoingStr}</td>
                    <td class="amount-col">${incomingStr}</td>
                    <td>${displayDate}</td>
                    <td>
                        <button class="action-btn edit" onclick="editTransaction(${row.id})" title="Edit">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="action-btn delete" onclick="deleteTransaction(${row.id})" title="Delete">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                `;
            }
            tbody.appendChild(tr);
        });
    }

    function updateStats() {
        let totalIncoming = 0;
        let totalOutgoing = 0;

        transactions.forEach(t => {
            if (currentPage === 'khata') {
                totalIncoming += Number(t.credit || 0);
                totalOutgoing += Number(t.debit || 0);
            } else if (currentPage === 'inventory') {
                totalIncoming += Number(t.stock_in || 0);
                totalOutgoing += Number(t.stock_out || 0);
            } else {
                const typ = t.type || 'incoming';
                if (typ === 'incoming') totalIncoming += Number(t.amount || 0);
                if (typ === 'outgoing') totalOutgoing += Number(t.amount || 0);
            }
        });

        const numIncoming = document.querySelector('.stat-card.incoming .stat-value');
        const numOutgoing = document.querySelector('.stat-card.outgoing .stat-value');
        const netBalance = document.querySelector('.stat-card.balance .stat-value');

        // Update labels for Inventory
        const incomingLabel = document.querySelector('.stat-card.incoming .stat-label');
        const outgoingLabel = document.querySelector('.stat-card.outgoing .stat-label');
        const balanceLabel = document.querySelector('.stat-card.balance .stat-label');

        if (currentPage === 'inventory') {
            if (incomingLabel) incomingLabel.textContent = getStr('col_stock_in');
            if (outgoingLabel) outgoingLabel.textContent = getStr('col_stock_out');
            if (balanceLabel) balanceLabel.textContent = 'Net Stock';

            if (numIncoming) numIncoming.textContent = totalIncoming.toLocaleString('en-PK');
            if (numOutgoing) numOutgoing.textContent = totalOutgoing.toLocaleString('en-PK');
            if (netBalance) netBalance.textContent = (totalIncoming - totalOutgoing).toLocaleString('en-PK');
        } else {
            if (incomingLabel) incomingLabel.textContent = getStr('stat_incoming');
            if (outgoingLabel) outgoingLabel.textContent = getStr('stat_outgoing');
            if (balanceLabel) balanceLabel.textContent = getStr('stat_balance');

            if (numIncoming) numIncoming.textContent = `₨ ${totalIncoming.toLocaleString('en-PK', { minimumFractionDigits: 2 })}`;
            if (numOutgoing) numOutgoing.textContent = `₨ ${totalOutgoing.toLocaleString('en-PK', { minimumFractionDigits: 2 })}`;
            if (netBalance) netBalance.textContent = `₨ ${(totalIncoming - totalOutgoing).toLocaleString('en-PK', { minimumFractionDigits: 2 })}`;
        }
    }

    // ---- Print & PDF Hooks ----
    const printBtn = document.querySelector('.btn-outline i.fa-print')?.parentElement;
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }

    const pdfBtn = document.querySelector('.btn-outline i.fa-file-export')?.parentElement;
    if (pdfBtn) {
        pdfBtn.addEventListener('click', () => {
            alert("To export to PDF, click Print and select 'Save as PDF' as your Destination.");
            window.print();
        });
    }

    const filterBtn = document.querySelector('.header-filters .btn-primary');
    if (filterBtn) {
        filterBtn.addEventListener('click', () => {
            alert('Filtering is under development! We will link this to the SQL database soon.');
        });
    }

    // ---- Reminder Notification Engine ----
    let reminderPoller = null;
    let notifiedIds = new Set(); // Prevent spamming same reminder 

    async function checkReminders() {
        if (!authToken) return;
        try {
            const res = await fetch(`${API_BASE}/reminders`, {
                headers: { 'Authorization': `Bearer ${authToken}` }
            });
            if (!res.ok) return;
            const allReminders = await res.json();

            const now = new Date();

            for (const r of allReminders) {
                if (r.is_completed) continue;

                const remindTime = new Date(r.remind_at);

                // If it's time (within the last 2 minutes to be safe) AND we haven't notified yet
                const diffMs = now - remindTime;
                if (diffMs >= 0 && diffMs <= 120000 && !notifiedIds.has(r.id)) {
                    notifiedIds.add(r.id);
                    triggerNativeNotification(r.title, r.description);
                    await handleReminderCompletion(r);
                } else if (diffMs > 120000 && !notifiedIds.has(r.id)) {
                    // It's way past overdue and we missed it (e.g. app was closed).
                    // We could notify them "Missed reminder", but let's just mark it complete/repeat
                    notifiedIds.add(r.id);
                    await handleReminderCompletion(r);
                }
            }
        } catch (err) {
            console.error("Error polling reminders:", err);
        }
    }

    async function handleReminderCompletion(reminder) {
        let payload = { ...reminder, is_completed: true };

        // Handle repeats
        if (reminder.repeat_type !== 'none') {
            const nextDate = new Date(reminder.remind_at);
            if (reminder.repeat_type === 'daily') nextDate.setDate(nextDate.getDate() + 1);
            if (reminder.repeat_type === 'weekly') nextDate.setDate(nextDate.getDate() + 7);
            if (reminder.repeat_type === 'monthly') nextDate.setMonth(nextDate.getMonth() + 1);

            // Keep the format MySQL likes for DATETIME: YYYY-MM-DD HH:MM:SS
            const localDateStr = `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, '0')}-${String(nextDate.getDate()).padStart(2, '0')} ${String(nextDate.getHours()).padStart(2, '0')}:${String(nextDate.getMinutes()).padStart(2, '0')}:00`;

            payload.remind_at = localDateStr;
            // keep it incomplete for the next cycle
            payload.is_completed = false;
            notifiedIds.delete(reminder.id);
        }

        try {
            // Update DB
            const res = await fetch(`${API_BASE}/reminders/${reminder.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(payload)
            });
            // Auto refresh if they are on the reminders page
            if (res.ok && currentPage === 'reminders') {
                fetchTransactions();
            }
        } catch (e) {
            console.error("Failed to update completed reminder", e);
        }
    }

    function triggerNativeNotification(title, body) {
        if (!("Notification" in window)) return;

        if (Notification.permission === "granted") {
            new Notification(title, { body: body, icon: 'https://ui-avatars.com/api/?name=Reminder&background=10b981&color=fff' });
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    new Notification(title, { body: body });
                }
            });
        }
    }

    window.scheduleNotifications = () => {
        // Ask permission immediately
        if ("Notification" in window && Notification.permission === "default") {
            Notification.requestPermission();
        }

        if (reminderPoller) clearInterval(reminderPoller);
        // Check immediately
        checkReminders();
        // Then poll every minute
        reminderPoller = setInterval(checkReminders, 60000);
    };

    // Call render on first load if authenticated
    checkAuth();

    // Start polling if already logged in (re-load)
    if (authToken) {
        window.scheduleNotifications();
    }
});
