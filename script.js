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
            opt_purch: 'Purchase'
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
            opt_purch: 'خریداری'
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

    const navItems = {
        'nav-daybook': { page: 'daybook', title: getStr('nav_daybook'), icon: 'fa-book-open', showStats: true, showFilters: true },
        'nav-inventory': { page: 'inventory', title: getStr('nav_inventory'), icon: 'fa-boxes-stacked', showStats: false, showFilters: false },
        'nav-khata': { page: 'khata', title: getStr('nav_khata'), icon: 'fa-wallet', showStats: true, showFilters: true }
    };

    const dashboardStats = document.getElementById('dashboard-stats');
    const dateFilters = document.getElementById('date-filters');
    const pageTitleText = document.getElementById('page-name');
    const pageTitleIcon = document.getElementById('page-icon');

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

        // Update Table Headers
        const thead = document.querySelector('.data-table thead tr');
        if (thead) {
            if (currentPage === 'inventory') {
                thead.innerHTML = `
                    <th data-i18n="col_pname">${getStr('col_pname')}</th>
                    <th data-i18n="col_category">${getStr('col_category')}</th>
                    <th class="amount-col" data-i18n="col_stock_in">${getStr('col_stock_in')}</th>
                    <th class="amount-col" data-i18n="col_stock_out">${getStr('col_stock_out')}</th>
                    <th data-i18n="col_date">${getStr('col_date')}</th>
                    <th data-i18n="col_actions">${getStr('col_actions')}</th>
                `;
            } else if (currentPage === 'khata') {
                thead.innerHTML = `
                    <th data-i18n="col_client">${getStr('col_client')}</th>
                    <th data-i18n="col_notes">${getStr('col_notes')}</th>
                    <th class="amount-col" data-i18n="col_debit">${getStr('col_debit')}</th>
                    <th class="amount-col" data-i18n="col_credit">${getStr('col_credit')}</th>
                    <th data-i18n="col_date">${getStr('col_date')}</th>
                    <th data-i18n="col_actions">${getStr('col_actions')}</th>
                `;
            } else {
                thead.innerHTML = `
                    <th data-i18n="col_details">${getStr('col_details')}</th>
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
    const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:5000/api'
        : '/api';

    let transactions = [];

    async function fetchTransactions() {
        try {
            let endpoint = `${API_BASE}/transactions`;
            if (currentPage === 'inventory') endpoint = `${API_BASE}/inventory`;
            if (currentPage === 'khata') endpoint = `${API_BASE}/khata`;

            const response = await fetch(endpoint);
            if (!response.ok) throw new Error('Failed to fetch data from database');

            transactions = await response.json();
            renderTransactions();

            if (currentPage === 'daybook' || currentPage === 'khata') {
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
                const qty = Number(inputs[3].value);
                entryData = {
                    date: inputs[0].value,
                    product_name: inputs[1].value,
                    category: type,
                    stock_in: type === 'in' ? qty : 0,
                    stock_out: type === 'out' ? qty : 0
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
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(entryData)
                    });
                } else {
                    response = await fetch(endpoint, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(entryData)
                    });
                }

                if (!response.ok) throw new Error('Failed to save to database');

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

    // ---- Global Actions for Buttons generated in HTML string ----
    window.deleteTransaction = async (id) => {
        if (!confirm("Are you sure you want to delete this entry?")) return;
        try {
            let endpoint = `${API_BASE}/transactions`;
            if (currentPage === 'inventory') endpoint = `${API_BASE}/inventory`;
            if (currentPage === 'khata') endpoint = `${API_BASE}/khata`;

            const response = await fetch(`${endpoint}/${id}`, {
                method: 'DELETE'
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
            inputs[2].value = row.category; // type 'in' or 'out'
            inputs[3].value = row.category === 'in' ? row.stock_in : row.stock_out;
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
            tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">${getStr('no_data')}</td></tr>`;
            return;
        }

        transactions.forEach(row => {
            const tr = document.createElement('tr');
            const displayDate = new Date(row.date).toLocaleDateString('en-GB');

            if (currentPage === 'inventory') {
                const badgeClass = row.category.toLowerCase() === 'in' ? 'badge badge-success' : 'badge badge-warning';
                const catDisplay = row.category === 'in' ? getStr('cat_in') : getStr('cat_out');
                tr.innerHTML = `
                    <td><strong>${row.product_name}</strong></td>
                    <td><span class="${badgeClass}">${catDisplay}</span></td>
                    <td class="amount-col text-success">${row.stock_in}</td>
                    <td class="amount-col text-danger">${row.stock_out}</td>
                    <td>${displayDate}</td>
                    <td>
                        <button class="action-btn edit" onclick="editTransaction(${row.id})" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="action-btn delete" onclick="deleteTransaction(${row.id})" title="Delete"><i class="fa-solid fa-trash"></i></button>
                    </td>
                `;
            } else if (currentPage === 'khata') {
                tr.innerHTML = `
                    <td><strong>${row.client_name}</strong></td>
                    <td><span class="text-muted">${row.notes || '-'}</span></td>
                    <td class="amount-col text-danger">${Number(row.debit).toLocaleString('en-PK')}</td>
                    <td class="amount-col text-success">${Number(row.credit).toLocaleString('en-PK')}</td>
                    <td>${displayDate}</td>
                    <td>
                        <button class="action-btn edit" onclick="editTransaction(${row.id})" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="action-btn delete" onclick="deleteTransaction(${row.id})" title="Delete"><i class="fa-solid fa-trash"></i></button>
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
            } else {
                const typ = t.type || 'incoming';
                if (typ === 'incoming') totalIncoming += Number(t.amount || 0);
                if (typ === 'outgoing') totalOutgoing += Number(t.amount || 0);
            }
        });

        const numIncoming = document.querySelector('.stat-card.incoming .stat-value');
        const numOutgoing = document.querySelector('.stat-card.outgoing .stat-value');
        const netBalance = document.querySelector('.stat-card.balance .stat-value');

        if (numIncoming) numIncoming.textContent = `₨ ${totalIncoming.toLocaleString('en-PK', { minimumFractionDigits: 2 })}`;
        if (numOutgoing) numOutgoing.textContent = `₨ ${totalOutgoing.toLocaleString('en-PK', { minimumFractionDigits: 2 })}`;
        if (netBalance) netBalance.textContent = `₨ ${(totalIncoming - totalOutgoing).toLocaleString('en-PK', { minimumFractionDigits: 2 })}`;
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

    // Call render on first load
    fetchTransactions();
});
