const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'script.js');
let code = fs.readFileSync(targetFile, 'utf8');

// 1. Insert the dictionary and state at the top after DOMContentLoaded
const DICT = `
    const i18n = {
        'en': {
            // sidebar & pages
            nav_daybook: 'Day Book',
            nav_inventory: 'Inventory',
            nav_khata: 'Khata Details',
            
            // table & actions
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
            
            // modal labels
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
            lbl_details: 'Description/Details',
            lbl_cat: 'Category',
            btn_cancel: 'Cancel',
            btn_save: 'Save Entry',
            
            // rendering
            cat_in: 'Stock In',
            cat_out: 'Stock Out',
            no_data: 'No data found. Add a new entry to get started.',
            
            // options
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

        // Re-render
        if (currentPage) {
            switchPage('nav-' + currentPage);
        }
    }

    // Bind Toggle Button
    setTimeout(() => {
        const langBtn = document.getElementById('lang-btn');
        if (langBtn) {
            langBtn.addEventListener('click', () => {
                window.currentLang = window.currentLang === 'en' ? 'ur' : 'en';
                updateLanguage();
            });
        }
        updateLanguage(); // init call
    }, 100);
`;

code = code.replace("document.addEventListener('DOMContentLoaded', () => {", "document.addEventListener('DOMContentLoaded', () => {\n" + DICT);

// 2. Fix Nav Items titles
code = code.replace("title: 'Day Book / روزنامچہ'", "title: getStr('nav_daybook')");
code = code.replace("title: 'Inventory / مال کی تفصیل'", "title: getStr('nav_inventory')");
code = code.replace("title: 'Khata / کھاتہ'", "title: getStr('nav_khata')");

// 3. Fix switchPage headers
code = code.replace(/<th>Product Name \/ پراڈکٹ کا نام<\/th>/g, "<th data-i18n=\\"col_pname\\">\\${getStr('col_pname')}<\\/th>");
code = code.replace(/<th>Category \/ زمرہ<\/th>/g, "<th data-i18n=\\"col_category\\">\\${getStr('col_category')}<\\/th>");
code = code.replace(/<th class="amount-col">Stock In \/ سٹاک وصول<\/th>/g, "<th class=\\"amount - col\\" data-i18n=\\"col_stock_in\\">\\${getStr('col_stock_in')}<\\/th>");
code = code.replace(/<th class="amount-col">Stock Out \/ سٹاک خروج<\/th>/g, "<th class=\\"amount - col\\" data-i18n=\\"col_stock_out\\">\\${getStr('col_stock_out')}<\\/th>");
code = code.replace(/<th>Date \/ تاریخ<\/th>/g, "<th data-i18n=\\"col_date\\">\\${getStr('col_date')}<\\/th>");
code = code.replace(/<th>Actions \/ عمل<\/th>/g, "<th data-i18n=\\"col_actions\\">\\${getStr('col_actions')}<\\/th>");

code = code.replace(/<th>Client \/ Party \/ پارٹی کا نام<\/th>/g, "<th data-i18n=\\"col_client\\">\\${getStr('col_client')}<\\/th>");
code = code.replace(/<th>Notes \/ تفصیل<\/th>/g, "<th data-i18n=\\"col_notes\\">\\${getStr('col_notes')}<\\/th>");
code = code.replace(/<th class="amount-col">Debit \(Out\) \/ نام<\/th>/g, "<th class=\\"amount - col\\" data-i18n=\\"col_debit\\">\\${getStr('col_debit')}<\\/th>");
code = code.replace(/<th class="amount-col">Credit \(In\) \/ جمع<\/th>/g, "<th class=\\"amount - col\\" data-i18n=\\"col_credit\\">\\${getStr('col_credit')}<\\/th>");

code = code.replace(/<th>Details \/ تفصیل<\/th>/g, "<th data-i18n=\\"col_details\\">\\${getStr('col_details')}<\\/th>");
code = code.replace(/<th class="amount-col">Outgoing \(₨\) \/ نام<\/th>/g, "<th class=\\"amount - col\\" data-i18n=\\"col_outgoing\\">\\${getStr('col_outgoing')}<\\/th>");
code = code.replace(/<th class="amount-col">Incoming \(₨\) \/ جمع<\/th>/g, "<th class=\\"amount - col\\" data-i18n=\\"col_incoming\\">\\${getStr('col_incoming')}<\\/th>");


// 4. Update buildForm() to use translated text
const buildFormPattern = /function buildForm\(\) \{[\s\S]*?\/\/\/ Default Daybook Form[\s\S]*?entryModal\.classList\.remove\('active'\);\n\s+resetModal\(\);\n\s+\}\);\n\s+\}\n\s+\}/s;

const newBuildForm = `function buildForm() {
        if (currentPage === 'inventory') {
            document.querySelector('.modal-header h2').textContent = editingId ? getStr('mod_edit_inv') : getStr('mod_add_inv');
            entryForm.innerHTML = \`
                <div class="form-group">
                    <label>\${getStr('lbl_date')}</label>
                    <input type="date" required value="\${new Date().toISOString().split('T')[0]}">
                </div>
                <div class="form-group">
                    <label>\${getStr('lbl_pname')}</label>
                    <input type="text" placeholder="E.g. DAP Fertilizer" required>
                </div>
                <div class="form-group">
                    <label>\${getStr('lbl_type')}</label>
                    <select required id="entry-type">
                        <option value="in">\${getStr('opt_in')}</option>
                        <option value="out">\${getStr('opt_out')}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>\${getStr('lbl_qty')}</label>
                    <input type="number" placeholder="0" required>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-secondary close-modal">\${getStr('btn_cancel')}</button>
                    <button type="submit" class="btn-primary">\${getStr('btn_save')}</button>
                </div>
            \`;
        } else if (currentPage === 'khata') {
            document.querySelector('.modal-header h2').textContent = editingId ? getStr('mod_edit_kha') : getStr('mod_add_kha');
            entryForm.innerHTML = \`
                <div class="form-group">
                    <label>\${getStr('lbl_date')}</label>
                    <input type="date" required value="\${new Date().toISOString().split('T')[0]}">
                </div>
                <div class="form-group">
                    <label>\${getStr('lbl_client')}</label>
                    <input type="text" placeholder="E.g. Ali Farmer" required>
                </div>
                <div class="form-group">
                    <label>\${getStr('lbl_type')}</label>
                    <select required id="entry-type">
                        <option value="debit">\${getStr('opt_dr')}</option>
                        <option value="credit">\${getStr('opt_cr')}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>\${getStr('lbl_amt')}</label>
                    <input type="number" placeholder="0" required>
                </div>
                <div class="form-group">
                    <label>\${getStr('lbl_notes')}</label>
                    <input type="text" placeholder="Bag details, etc.">
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-secondary close-modal">\${getStr('btn_cancel')}</button>
                    <button type="submit" class="btn-primary">\${getStr('btn_save')}</button>
                </div>
            \`;
        } else {
            document.querySelector('.modal-header h2').textContent = editingId ? getStr('mod_edit_day') : getStr('mod_add_day');
            entryForm.innerHTML = \`
                <div class="form-group">
                    <label>\${getStr('lbl_date')}</label>
                    <input type="date" required value="\${new Date().toISOString().split('T')[0]}">
                </div>
                <div class="form-group">
                    <label>\${getStr('lbl_details')}</label>
                    <input type="text" placeholder="" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>\${getStr('lbl_cat')}</label>
                        <select required>
                            <option value="">\${getStr('opt_sel')}</option>
                            <option value="sale">\${getStr('opt_sale')}</option>
                            <option value="purchase">\${getStr('opt_purch')}</option>
                            <option value="general">\${getStr('opt_gen')}</option>
                            <option value="fertilizer">\${getStr('opt_fert')}</option>
                            <option value="seeds">\${getStr('opt_seed')}</option>
                            <option value="expense">\${getStr('opt_exp')}</option>
                            <option value="payment">\${getStr('opt_pay')}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>\${getStr('lbl_type')}</label>
                        <select required id="entry-type">
                            <option value="incoming">\${getStr('opt_inc')}</option>
                            <option value="outgoing">\${getStr('opt_outg')}</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>\${getStr('lbl_amt')}</label>
                    <input type="number" placeholder="0" required>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-secondary close-modal">\${getStr('btn_cancel')}</button>
                    <button type="submit" class="btn-primary">\${getStr('btn_save')}</button>
                </div>
            \`;
        }

        const dynamicCancel = entryForm.querySelector('.close-modal');
        if (dynamicCancel) {
            dynamicCancel.addEventListener('click', (e) => {
                e.preventDefault();
                entryModal.classList.remove('active');
                resetModal();
            });
        }
    }`;

// Doing standard string replace since pattern matching might snag on format changes
let newStr = code;
let startIdx = newStr.indexOf("function buildForm() {");
let endIdx = newStr.indexOf("if (addEntryBtn) {", startIdx);

if (startIdx > -1 && endIdx > -1) {
    code = newStr.substring(0, startIdx) + newBuildForm + "\n\n    " + newStr.substring(endIdx);
} else {
    console.error("Could not find buildForm boundaries");
}

// 5. Fix table empty state string
code = code.replace(/<td colspan="6" style="text-align: center; color: var\(--text-muted\);">No data found\.[^<]*<\/td>/, '<td colspan="6" style="text-align: center; color: var(--text-muted);">\\${getStr(\\'no_data\\')}</td>');

// 6. Fix table dynamic text badge assignments
code = code.replace(/const catDisplay = row\.category === 'in' \? 'Stock In' : 'Stock Out';/, "const catDisplay = row.category === 'in' ? getStr('cat_in') : getStr('cat_out');");

code = code.replace(/const catDisplay = categoryRaw\.charAt\(0\)\.toUpperCase\(\) \+ categoryRaw\.slice\(1\);/, "const mapping = { sale: getStr('opt_sale'), purchase: getStr('opt_purch'), general: getStr('opt_gen'), fertilizer: getStr('opt_fert'), seeds: getStr('opt_seed'), expense: getStr('opt_exp'), payment: getStr('opt_pay') };\\n                const catDisplay = mapping[categoryRaw] || (categoryRaw.charAt(0).toUpperCase() + categoryRaw.slice(1));");

// Replace navItem config access
code = code.replace("if (pageTitleText) pageTitleText.textContent = config.title;", "if (pageTitleText) pageTitleText.textContent = getStr('nav_' + navId.split('-')[1]);");

fs.writeFileSync(targetFile, code, 'utf8');
console.log("Transformation completed.");
