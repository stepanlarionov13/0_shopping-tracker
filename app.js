/**
 * Мой Чек / My Cart / Moj Račun
 * Multilingual (RU, EN, ME) Grocery & Expense Tracker
 * Vanilla JavaScript with localStorage persistence.
 */

// Storage keys
const STORAGE_KEY_ITEMS = 'smart_grocery_items_v2';
const STORAGE_KEY_CURRENCY = 'smart_grocery_currency_v2';
const STORAGE_KEY_LANGUAGE = 'smart_grocery_lang_v2';

// Supported currencies
const CURRENCIES = {
  '₽': { symbol: '₽' },
  '$': { symbol: '$' },
  '€': { symbol: '€' },
  '¥': { symbol: '¥' }
};

// Full Translations Dictionary (Russian, English, Montenegrin)
const TRANSLATIONS = {
  ru: {
    appName: 'Мой Чек',
    appSubtitle: 'Контроль расходов в магазине',
    docTitle: 'Мой Чек — Трекер покупок и корзины',
    currencyLabel: 'Валюта:',
    currencies: {
      '₽': '₽ (Рубль)',
      '$': '$ (Доллар)',
      '€': '€ (Евро)',
      '¥': '¥ (Юань)'
    },
    tabPlan: 'Запланировать',
    tabStore: 'Вне плана в магазине',
    whatToBuy: 'Что купить?',
    planPlaceholder: 'Например: Молоко, Яблоки, Сыр...',
    qtyWeight: 'Количество / Вес',
    unitLabel: 'Ед. измерения',
    units: {
      шт: 'шт (штуки)',
      кг: 'кг (килограммы)',
      г: 'г (граммы)',
      л: 'л (литры)',
      упак: 'упак (упаковки)'
    },
    unitShort: {
      шт: 'шт',
      кг: 'кг',
      г: 'г',
      л: 'л',
      упак: 'упак'
    },
    quickLabel: 'Быстро:',
    quickChips: [
      { name: 'Хлеб', unit: 'шт', qty: '1' },
      { name: 'Молоко', unit: 'л', qty: '1' },
      { name: 'Яйца (10 шт)', unit: 'упак', qty: '1' },
      { name: 'Бананы', unit: 'кг', qty: '1' },
      { name: 'Сыр', unit: 'г', qty: '300' }
    ],
    btnAddToList: 'Добавить в список',
    storeBadge: 'Сразу отправляется в корзину',
    storeNameLabel: 'Название товара',
    storePlaceholder: 'Что берете? Например: Шоколад, Вода...',
    storePriceLabel: 'Цена на ценнике/этикетке',
    calcModeLabel: 'Режим расчета стоимости:',
    modeUnitBtn: 'За 1 ед. (× кол-во)',
    modeTotalBtn: 'За всё (наклейка)',
    modeUnitHint: 'Умножит введенную цену на количество',
    modeTotalHint: 'Цена будет считаться итоговой за всю позицию (как на весовом стикере)',
    btnStoreAdd: 'В корзину и посчитать',
    filterAll: 'Все',
    filterPending: 'Надо купить',
    filterInCart: 'В корзине',
    btnResetPrices: 'Сбросить цены',
    btnClearAll: 'Очистить всё',
    emptyTitle: 'Список покупок пуст',
    emptyDesc: 'Добавьте нужные товары заранее или внесите прямо в торговом зале',
    btnLoadSample: 'Загрузить пример списка',
    emptyTab: 'В этой вкладке пока нет товаров',
    inCartStatus: 'В корзине',
    inListStatus: 'В списке',
    deleteItem: 'Удалить товар',
    modeDescUnit: 'Умножать цену на количество',
    modeDescTotal: 'Итоговая сумма по чеку/стикеру',
    gramsTip: '💡 В граммах? На наклейке уже итоговая сумма:',
    gramsTipBtn: 'Включить «За всё»',
    enterPrice: 'Введите цену',
    fixedTotal: 'Фиксированная цена за всё',
    subtotalLabel: 'Сумма:',
    dividerInCart: 'В корзине',
    summaryInCart: 'В корзине:',
    summaryOf: 'из',
    summaryRemaining: 'Осталось взять:',
    summaryTotal: 'Итого к оплате',
    modalResetTitle: 'Сбросить цены и корзину?',
    modalResetDesc: 'Все галочки «В корзине» и введенные цены будут очищены. Сам список товаров останется для нового похода в магазин.',
    modalClearTitle: 'Удалить весь список?',
    modalClearDesc: 'Вы уверены, что хотите полностью стереть все товары из списка?',
    modalCancel: 'Отмена',
    modalConfirm: 'Да, подтверждаю'
  },
  en: {
    appName: 'My Cart',
    appSubtitle: 'In-store expense & cart tracker',
    docTitle: 'My Cart — In-Store Shopping Tracker',
    currencyLabel: 'Currency:',
    currencies: {
      '₽': '₽ (Ruble)',
      '$': '$ (Dollar)',
      '€': '€ (Euro)',
      '¥': '¥ (Yuan)'
    },
    tabPlan: 'Plan Items',
    tabStore: 'In-Store Quick Add',
    whatToBuy: 'What to buy?',
    planPlaceholder: 'e.g. Milk, Apples, Cheese...',
    qtyWeight: 'Qty / Weight',
    unitLabel: 'Unit',
    units: {
      шт: 'pcs (pieces)',
      кг: 'kg (kilograms)',
      г: 'g (grams)',
      л: 'l (liters)',
      упак: 'pack (packs)'
    },
    unitShort: {
      шт: 'pcs',
      кг: 'kg',
      г: 'g',
      л: 'l',
      упак: 'pack'
    },
    quickLabel: 'Quick:',
    quickChips: [
      { name: 'Bread', unit: 'шт', qty: '1' },
      { name: 'Milk', unit: 'л', qty: '1' },
      { name: 'Eggs (10 pcs)', unit: 'упак', qty: '1' },
      { name: 'Bananas', unit: 'кг', qty: '1' },
      { name: 'Cheese', unit: 'г', qty: '300' }
    ],
    btnAddToList: 'Add to list',
    storeBadge: 'Added directly to cart',
    storeNameLabel: 'Item name',
    storePlaceholder: 'What are you picking? e.g. Chocolate, Water...',
    storePriceLabel: 'Price on shelf / sticker',
    calcModeLabel: 'Calculation mode:',
    modeUnitBtn: 'Per 1 unit (× qty)',
    modeTotalBtn: 'Total sum (sticker)',
    modeUnitHint: 'Multiplies price by quantity',
    modeTotalHint: 'Price is taken as total for this item (as on weight sticker)',
    btnStoreAdd: 'Add to cart & calculate',
    filterAll: 'All',
    filterPending: 'To Buy',
    filterInCart: 'In Cart',
    btnResetPrices: 'Reset prices',
    btnClearAll: 'Clear all',
    emptyTitle: 'Shopping list is empty',
    emptyDesc: 'Add planned items in advance or add them on-the-fly while shopping',
    btnLoadSample: 'Load sample list',
    emptyTab: 'No items in this tab yet',
    inCartStatus: 'In cart',
    inListStatus: 'In list',
    deleteItem: 'Delete item',
    modeDescUnit: 'Multiply price by quantity',
    modeDescTotal: 'Total price from receipt/sticker',
    gramsTip: '💡 In grams? Total price already on sticker:',
    gramsTipBtn: 'Switch to «Total»',
    enterPrice: 'Enter price',
    fixedTotal: 'Fixed total price',
    subtotalLabel: 'Subtotal:',
    dividerInCart: 'In cart',
    summaryInCart: 'In cart:',
    summaryOf: 'of',
    summaryRemaining: 'Remaining:',
    summaryTotal: 'Total to pay',
    modalResetTitle: 'Reset prices & cart?',
    modalResetDesc: 'All checkmarks and prices will be cleared. The item list will remain for your next shopping trip.',
    modalClearTitle: 'Delete entire list?',
    modalClearDesc: 'Are you sure you want to completely erase all items from the list?',
    modalCancel: 'Cancel',
    modalConfirm: 'Yes, confirm'
  },
  me: {
    appName: 'Moj Račun',
    appSubtitle: 'Kontrola troškova u prodavnici',
    docTitle: 'Moj Račun — Praćenje troškova u prodavnici',
    currencyLabel: 'Valuta:',
    currencies: {
      '₽': '₽ (Rublja)',
      '$': '$ (Dolar)',
      '€': '€ (Euro)',
      '¥': '¥ (Juan)'
    },
    tabPlan: 'Planiraj',
    tabStore: 'Van plana u prodavnici',
    whatToBuy: 'Šta kupiti?',
    planPlaceholder: 'Npr: Mlijeko, Jabuke, Sir...',
    qtyWeight: 'Količina / Težina',
    unitLabel: 'Jed. mjere',
    units: {
      шт: 'kom (komada)',
      кг: 'kg (kilogrami)',
      г: 'g (grami)',
      л: 'l (litri)',
      упак: 'pak (pakovanja)'
    },
    unitShort: {
      шт: 'kom',
      кг: 'kg',
      г: 'g',
      л: 'l',
      упак: 'pak'
    },
    quickLabel: 'Brzo:',
    quickChips: [
      { name: 'Hljeb', unit: 'шт', qty: '1' },
      { name: 'Mlijeko', unit: 'л', qty: '1' },
      { name: 'Jaja (10 kom)', unit: 'упак', qty: '1' },
      { name: 'Banane', unit: 'кг', qty: '1' },
      { name: 'Sir', unit: 'г', qty: '300' }
    ],
    btnAddToList: 'Dodaj na spisak',
    storeBadge: 'Odmah ide u korpu',
    storeNameLabel: 'Naziv artikla',
    storePlaceholder: 'Šta uzimate? Npr: Čokolada, Voda...',
    storePriceLabel: 'Cijena na polici/etiketi',
    calcModeLabel: 'Režim obračuna:',
    modeUnitBtn: 'Po 1 jed. (× kol)',
    modeTotalBtn: 'Ukupno (naljepnica)',
    modeUnitHint: 'Množi cijenu sa količinom',
    modeTotalHint: 'Cijena je konačna za cijelu stavku (kao na naljepnici)',
    btnStoreAdd: 'U korpu i izračunaj',
    filterAll: 'Sve',
    filterPending: 'Za kupiti',
    filterInCart: 'U korpi',
    btnResetPrices: 'Resetuj cijene',
    btnClearAll: 'Obriši sve',
    emptyTitle: 'Spisak za kupovinu je prazan',
    emptyDesc: 'Dodajte artikle unaprijed ili unesite direktno u prodavnici',
    btnLoadSample: 'Učitaj primjer spiska',
    emptyTab: 'U ovoj kartici još nema artikala',
    inCartStatus: 'U korpi',
    inListStatus: 'Na spisku',
    deleteItem: 'Obriši artikal',
    modeDescUnit: 'Množenje cijene sa količinom',
    modeDescTotal: 'Ukupna cijena sa naljepnice',
    gramsTip: '💡 U gramima? Konačna cijena je na naljepnici:',
    gramsTipBtn: 'Uključi «Ukupno»',
    enterPrice: 'Unesite cijenu',
    fixedTotal: 'Fiksna ukupna cijena',
    subtotalLabel: 'Iznos:',
    dividerInCart: 'U korpi',
    summaryInCart: 'U korpi:',
    summaryOf: 'od',
    summaryRemaining: 'Ostalo:',
    summaryTotal: 'Ukupno za plaćanje',
    modalResetTitle: 'Resetovati cijene i korpu?',
    modalResetDesc: 'Sve oznake «U korpi» i unesene cijene biće obrisane. Spisak artikala ostaje za sljedeću kupovinu.',
    modalClearTitle: 'Obrisati cijeli spisak?',
    modalClearDesc: 'Da li ste sigurni da želite potpuno obrisati sve artikle sa spiska?',
    modalCancel: 'Otkaži',
    modalConfirm: 'Da, potvrdi'
  }
};

// Realistic sample items for demo, localized
const SAMPLE_ITEMS_BY_LANG = {
  ru: [
    { id: 'sample-4', name: 'Хлеб ремесленный', quantity: 1, unit: 'шт', price: 54.00, pricingMode: 'unit', inCart: false, createdAt: Date.now() - 50000 },
    { id: 'sample-5', name: 'Яйца С0 (10 шт)', quantity: 1, unit: 'упак', price: 125.00, pricingMode: 'unit', inCart: false, createdAt: Date.now() - 40000 },
    { id: 'sample-1', name: 'Молоко 3.2%', quantity: 2, unit: 'л', price: 89.90, pricingMode: 'unit', inCart: true, createdAt: Date.now() - 30000 },
    { id: 'sample-2', name: 'Фарш говяжий', quantity: 650, unit: 'г', price: 389.00, pricingMode: 'total', inCart: true, createdAt: Date.now() - 20000 },
    { id: 'sample-3', name: 'Бананы', quantity: 1.4, unit: 'кг', price: 139.90, pricingMode: 'unit', inCart: true, createdAt: Date.now() - 10000 }
  ],
  en: [
    { id: 'sample-4', name: 'Artisan Bread', quantity: 1, unit: 'шт', price: 2.50, pricingMode: 'unit', inCart: false, createdAt: Date.now() - 50000 },
    { id: 'sample-5', name: 'Eggs (10 pcs)', quantity: 1, unit: 'упак', price: 3.20, pricingMode: 'unit', inCart: false, createdAt: Date.now() - 40000 },
    { id: 'sample-1', name: 'Whole Milk', quantity: 2, unit: 'л', price: 1.80, pricingMode: 'unit', inCart: true, createdAt: Date.now() - 30000 },
    { id: 'sample-2', name: 'Ground Beef', quantity: 650, unit: 'г', price: 6.90, pricingMode: 'total', inCart: true, createdAt: Date.now() - 20000 },
    { id: 'sample-3', name: 'Bananas', quantity: 1.4, unit: 'кг', price: 1.50, pricingMode: 'unit', inCart: true, createdAt: Date.now() - 10000 }
  ],
  me: [
    { id: 'sample-4', name: 'Domaći hljeb', quantity: 1, unit: 'шт', price: 0.90, pricingMode: 'unit', inCart: false, createdAt: Date.now() - 50000 },
    { id: 'sample-5', name: 'Jaja (10 kom)', quantity: 1, unit: 'упак', price: 2.10, pricingMode: 'unit', inCart: false, createdAt: Date.now() - 40000 },
    { id: 'sample-1', name: 'Mlijeko 3.2%', quantity: 2, unit: 'л', price: 1.45, pricingMode: 'unit', inCart: true, createdAt: Date.now() - 30000 },
    { id: 'sample-2', name: 'Mljeveno meso', quantity: 650, unit: 'г', price: 5.80, pricingMode: 'total', inCart: true, createdAt: Date.now() - 20000 },
    { id: 'sample-3', name: 'Banane', quantity: 1.4, unit: 'кг', price: 1.35, pricingMode: 'unit', inCart: true, createdAt: Date.now() - 10000 }
  ]
};

// Application State
const state = {
  language: 'ru', // 'ru' | 'en' | 'me'
  currency: '₽',
  items: [],
  filter: 'all', // 'all' | 'pending' | 'inCart'
  storeFormMode: 'unit', // 'unit' | 'total' for on-the-fly form
};

// Translation lookup helper
function t(key) {
  const langObj = TRANSLATIONS[state.language] || TRANSLATIONS['ru'];
  return langObj[key] !== undefined ? langObj[key] : (TRANSLATIONS['ru'][key] || '');
}

// Utility: Normalize decimal input in any language (converts comma to dot, trims spaces)
function parseNumber(value) {
  if (value === null || value === undefined) return 0;
  if (typeof value === 'number') return isNaN(value) ? 0 : value;
  const cleanStr = String(value).replace(/\s+/g, '').replace(',', '.');
  const num = parseFloat(cleanStr);
  return isNaN(num) || num < 0 ? 0 : num;
}

// Format numbers according to active language locale
function formatLocalizedNumber(num, minDec = 2, maxDec = 2) {
  let locale = 'ru-RU';
  if (state.language === 'en') locale = 'en-US';
  else if (state.language === 'me') locale = 'sr-ME';

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: minDec,
    maximumFractionDigits: maxDec
  }).format(num);
}

// Calculate cost for a single item
function getItemSubtotal(item) {
  const price = parseNumber(item.price);
  if (price <= 0) return 0;

  if (item.pricingMode === 'total') {
    // Mode B: "За всё" / "Total" - Entered price is the total final cost for this position
    return price;
  } else {
    // Mode A: "За 1 ед." / "Per 1 unit" - Multiply entered price by quantity
    const qty = parseNumber(item.quantity) || 1;
    return price * qty;
  }
}

// DOM Elements
const appTitle = document.getElementById('appTitle');
const appSubtitle = document.getElementById('appSubtitle');
const langButtons = document.querySelectorAll('.lang-btn');

const currencyLabel = document.getElementById('currencyLabel');
const currencySelect = document.getElementById('currencySelect');

const tabPlanBtn = document.getElementById('tabPlanBtn');
const tabPlanBtnText = document.getElementById('tabPlanBtnText');
const tabStoreBtn = document.getElementById('tabStoreBtn');
const tabStoreBtnText = document.getElementById('tabStoreBtnText');

const planForm = document.getElementById('planForm');
const planNameLabel = document.getElementById('planNameLabel');
const planName = document.getElementById('planName');
const planQtyLabel = document.getElementById('planQtyLabel');
const planQuantity = document.getElementById('planQuantity');
const planUnitLabel = document.getElementById('planUnitLabel');
const planUnit = document.getElementById('planUnit');
const quickLabel = document.getElementById('quickLabel');
const quickChipsContainer = document.getElementById('quickChipsContainer');
const btnPlanSubmitText = document.getElementById('btnPlanSubmitText');

const storeForm = document.getElementById('storeForm');
const storeBadgeText = document.getElementById('storeBadgeText');
const storeNameLabel = document.getElementById('storeNameLabel');
const storeName = document.getElementById('storeName');
const storeQtyLabel = document.getElementById('storeQtyLabel');
const storeQuantity = document.getElementById('storeQuantity');
const storeUnitLabel = document.getElementById('storeUnitLabel');
const storeUnit = document.getElementById('storeUnit');
const storePriceLabel = document.getElementById('storePriceLabel');
const storePrice = document.getElementById('storePrice');
const storeCalcModeLabel = document.getElementById('storeCalcModeLabel');
const storeModeUnit = document.getElementById('storeModeUnit');
const storeModeTotal = document.getElementById('storeModeTotal');
const storeModeHint = document.getElementById('storeModeHint');
const btnStoreSubmitText = document.getElementById('btnStoreSubmitText');

const filterAll = document.getElementById('filterAll');
const filterAllText = document.getElementById('filterAllText');
const filterPending = document.getElementById('filterPending');
const filterPendingText = document.getElementById('filterPendingText');
const filterInCart = document.getElementById('filterInCart');
const filterInCartText = document.getElementById('filterInCartText');
const countAll = document.getElementById('countAll');
const countPending = document.getElementById('countPending');
const countInCart = document.getElementById('countInCart');

const btnResetChecks = document.getElementById('btnResetChecks');
const btnResetChecksText = document.getElementById('btnResetChecksText');
const btnClearAll = document.getElementById('btnClearAll');
const btnClearAllText = document.getElementById('btnClearAllText');

const itemsContainer = document.getElementById('itemsContainer');
const emptyState = document.getElementById('emptyState');
const emptyTitle = document.getElementById('emptyTitle');
const emptyDesc = document.getElementById('emptyDesc');
const btnLoadSample = document.getElementById('btnLoadSample');
const btnLoadSampleText = document.getElementById('btnLoadSampleText');

const summaryCartBadgeLabel = document.getElementById('summaryCartBadgeLabel');
const summaryCartTotal = document.getElementById('summaryCartTotal');
const summaryCartRatio = document.getElementById('summaryCartRatio');
const summaryPercent = document.getElementById('summaryPercent');
const summaryPendingLabel = document.getElementById('summaryPendingLabel');
const summaryPendingCount = document.getElementById('summaryPendingCount');
const summaryTotalLabel = document.getElementById('summaryTotalLabel');
const progressBar = document.getElementById('progressBar');

// Confirmation Modal Elements
const confirmModal = document.getElementById('confirmModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalCancelBtn = document.getElementById('modalCancelBtn');
const modalConfirmBtn = document.getElementById('modalConfirmBtn');
let pendingModalAction = null;
let reorderTimeout = null;

// Initialize
function init() {
  loadFromStorage();
  setupEventListeners();
  applyTranslations();
  render();
}

// Storage helpers
function saveToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(state.items));
    localStorage.setItem(STORAGE_KEY_CURRENCY, state.currency);
    localStorage.setItem(STORAGE_KEY_LANGUAGE, state.language);
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

function loadFromStorage() {
  try {
    const savedLang = localStorage.getItem(STORAGE_KEY_LANGUAGE);
    if (savedLang && TRANSLATIONS[savedLang]) {
      state.language = savedLang;
    }

    const savedCurrency = localStorage.getItem(STORAGE_KEY_CURRENCY);
    if (savedCurrency && CURRENCIES[savedCurrency]) {
      state.currency = savedCurrency;
      if (currencySelect) currencySelect.value = savedCurrency;
    }

    const savedItems = localStorage.getItem(STORAGE_KEY_ITEMS);
    if (savedItems) {
      state.items = JSON.parse(savedItems);
      // Partition: pending items first, in-cart items at the bottom
      const pending = state.items.filter(i => !i.inCart);
      const inCart = state.items.filter(i => i.inCart);
      state.items = [...pending, ...inCart];
    } else {
      // First visit: prefill with friendly realistic samples for active language
      const samples = SAMPLE_ITEMS_BY_LANG[state.language] || SAMPLE_ITEMS_BY_LANG['ru'];
      state.items = JSON.parse(JSON.stringify(samples));
      saveToStorage();
    }
  } catch (err) {
    console.error('Failed to load from localStorage:', err);
    state.items = JSON.parse(JSON.stringify(SAMPLE_ITEMS_BY_LANG['ru']));
  }
}

// Set active language and apply translations across UI
function setLanguage(lang) {
  if (!TRANSLATIONS[lang] || lang === state.language) return;
  state.language = lang;
  saveToStorage();
  applyTranslations();
  render();
}

// Apply active translations to DOM
function applyTranslations() {
  // Document title
  document.title = t('docTitle');

  // Header Title & Subtitle
  if (appTitle) appTitle.textContent = t('appName');
  if (appSubtitle) appSubtitle.textContent = t('appSubtitle');

  // Language flag button states
  langButtons.forEach(btn => {
    if (btn.dataset.lang === state.language) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Currency label and dropdown options
  if (currencyLabel) currencyLabel.textContent = t('currencyLabel');
  if (currencySelect) {
    const curOptions = t('currencies');
    const curVal = currencySelect.value || state.currency;
    currencySelect.innerHTML = `
      <option value="₽">${curOptions['₽']}</option>
      <option value="$">${curOptions['$']}</option>
      <option value="€">${curOptions['€']}</option>
      <option value="¥">${curOptions['¥']}</option>
    `;
    currencySelect.value = curVal;
  }

  // Top Tabs
  if (tabPlanBtnText) tabPlanBtnText.textContent = t('tabPlan');
  if (tabStoreBtnText) tabStoreBtnText.textContent = t('tabStore');

  // Plan Form
  if (planNameLabel) planNameLabel.textContent = t('whatToBuy');
  if (planName) planName.placeholder = t('planPlaceholder');
  if (planQtyLabel) planQtyLabel.textContent = t('qtyWeight');
  if (planUnitLabel) planUnitLabel.textContent = t('unitLabel');
  if (btnPlanSubmitText) btnPlanSubmitText.textContent = t('btnAddToList');
  if (quickLabel) quickLabel.textContent = t('quickLabel');

  // Update units in planUnit and storeUnit
  updateUnitSelectOptions();

  // Quick Chips
  renderQuickChips();

  // Store Form
  if (storeBadgeText) storeBadgeText.textContent = t('storeBadge');
  if (storeNameLabel) storeNameLabel.textContent = t('storeNameLabel');
  if (storeName) storeName.placeholder = t('storePlaceholder');
  if (storeQtyLabel) storeQtyLabel.textContent = t('qtyWeight');
  if (storeUnitLabel) storeUnitLabel.textContent = t('unitLabel');
  if (storePriceLabel) storePriceLabel.textContent = t('storePriceLabel');
  if (storeCalcModeLabel) storeCalcModeLabel.textContent = t('calcModeLabel');
  if (storeModeUnit) storeModeUnit.textContent = t('modeUnitBtn');
  if (storeModeTotal) storeModeTotal.textContent = t('modeTotalBtn');
  if (btnStoreSubmitText) btnStoreSubmitText.textContent = t('btnStoreAdd');

  if (storeModeHint) {
    storeModeHint.textContent = state.storeFormMode === 'unit' ? t('modeUnitHint') : t('modeTotalHint');
  }

  // Filters & Action buttons
  if (filterAllText) filterAllText.textContent = t('filterAll');
  if (filterPendingText) filterPendingText.textContent = t('filterPending');
  if (filterInCartText) filterInCartText.textContent = t('filterInCart');
  if (btnResetChecksText) btnResetChecksText.textContent = t('btnResetPrices');
  if (btnClearAllText) btnClearAllText.textContent = t('btnClearAll');

  // Empty state
  if (emptyTitle) emptyTitle.textContent = t('emptyTitle');
  if (emptyDesc) emptyDesc.textContent = t('emptyDesc');
  if (btnLoadSampleText) btnLoadSampleText.textContent = t('btnLoadSample');

  // Bottom Sticky Bar
  if (summaryCartBadgeLabel) summaryCartBadgeLabel.textContent = t('summaryInCart');
  if (summaryPendingLabel) summaryPendingLabel.textContent = t('summaryRemaining');
  if (summaryTotalLabel) summaryTotalLabel.textContent = t('summaryTotal');

  // Modal buttons
  if (modalCancelBtn) modalCancelBtn.textContent = t('modalCancel');
  if (modalConfirmBtn) modalConfirmBtn.textContent = t('modalConfirm');
}

// Update unit select options
function updateUnitSelectOptions() {
  const unitsMap = t('units');
  [planUnit, storeUnit].forEach(sel => {
    if (!sel) return;
    const currentVal = sel.value || 'шт';
    sel.innerHTML = `
      <option value="шт">${unitsMap.шт}</option>
      <option value="кг">${unitsMap.кг}</option>
      <option value="г">${unitsMap.г}</option>
      <option value="л">${unitsMap.л}</option>
      <option value="упак">${unitsMap.упак}</option>
    `;
    sel.value = currentVal;
  });
}

// Render quick chips for active language
function renderQuickChips() {
  if (!quickChipsContainer) return;
  const chips = t('quickChips') || [];
  quickChipsContainer.innerHTML = chips.map(chip => `
    <button 
      type="button" 
      class="quick-chip bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 px-2 py-0.5 rounded-full transition text-xs select-none" 
      data-name="${escapeHTML(chip.name)}" 
      data-unit="${chip.unit}" 
      data-qty="${chip.qty}"
    >
      ${escapeHTML(chip.name)}
    </button>
  `).join('');

  // Re-attach listeners to dynamic quick chips
  quickChipsContainer.querySelectorAll('.quick-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      planName.value = chip.dataset.name;
      planUnit.value = chip.dataset.unit || 'шт';
      planQuantity.value = chip.dataset.qty || '1';
      planName.focus();
    });
  });
}

// Update currency symbols across UI
function updateCurrencyDisplay() {
  document.querySelectorAll('.active-currency-symbol').forEach(el => {
    el.textContent = state.currency;
  });
}

// Set up UI Event Listeners
function setupEventListeners() {
  // Language Selector Flags click
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang) setLanguage(lang);
    });
  });

  // Currency changed
  currencySelect.addEventListener('change', (e) => {
    state.currency = e.target.value;
    updateCurrencyDisplay();
    saveToStorage();
    renderSummary();
    renderItemsList();
  });

  // Top Tabs toggle (Plan vs In-store Quick Add)
  tabPlanBtn.addEventListener('click', () => switchTab('plan'));
  tabStoreBtn.addEventListener('click', () => switchTab('store'));

  // Plan Form Submit
  planForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = planName.value.trim();
    if (!name) return;

    const quantity = parseNumber(planQuantity.value) || 1;
    const unit = planUnit.value;

    const newItem = {
      id: 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      name: name,
      quantity: quantity,
      unit: unit,
      price: null,
      pricingMode: unit === 'г' ? 'total' : 'unit', // Smart default: grams are often total price on sticker
      inCart: false,
      createdAt: Date.now()
    };

    state.items.unshift(newItem);
    saveToStorage();

    // Reset form
    planName.value = '';
    planQuantity.value = '1';
    planName.focus();

    render();
  });

  // Store Form Toggle Mode buttons
  storeModeUnit.addEventListener('click', () => setStoreFormMode('unit'));
  storeModeTotal.addEventListener('click', () => setStoreFormMode('total'));

  // Store Form Submit (On-the-fly add)
  storeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = storeName.value.trim();
    if (!name) return;

    const quantity = parseNumber(storeQuantity.value) || 1;
    const unit = storeUnit.value;
    const price = storePrice.value.trim();

    const newItem = {
      id: 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      name: name,
      quantity: quantity,
      unit: unit,
      price: price,
      pricingMode: state.storeFormMode,
      inCart: true, // Crucial requirement: instantly added to cart!
      createdAt: Date.now()
    };

    // Since it's in the cart, place it at the bottom with in-cart items
    state.items.push(newItem);
    saveToStorage();

    // Reset store form
    storeName.value = '';
    storeQuantity.value = '1';
    storePrice.value = '';
    storeName.focus();

    // If currently filtered on 'pending' (which excludes in-cart items), switch to 'inCart'
    if (state.filter === 'pending') {
      setFilter('inCart');
    } else {
      render();
    }
  });

  // Filters
  filterAll.addEventListener('click', () => setFilter('all'));
  filterPending.addEventListener('click', () => setFilter('pending'));
  filterInCart.addEventListener('click', () => setFilter('inCart'));

  // Sample Load Button (loads samples in current language)
  btnLoadSample.addEventListener('click', () => {
    const samples = SAMPLE_ITEMS_BY_LANG[state.language] || SAMPLE_ITEMS_BY_LANG['ru'];
    state.items = JSON.parse(JSON.stringify(samples));
    saveToStorage();
    render();
  });

  // Reset checks and prices (to reuse list for next shopping trip)
  btnResetChecks.addEventListener('click', () => {
    showConfirmModal(
      t('modalResetTitle'),
      t('modalResetDesc'),
      () => {
        state.items = state.items.map(item => ({
          ...item,
          inCart: false,
          price: null
        }));
        saveToStorage();
        render();
      }
    );
  });

  // Clear all items
  btnClearAll.addEventListener('click', () => {
    showConfirmModal(
      t('modalClearTitle'),
      t('modalClearDesc'),
      () => {
        state.items = [];
        saveToStorage();
        render();
      }
    );
  });

  // Modal Cancel
  modalCancelBtn.addEventListener('click', hideConfirmModal);
  confirmModal.addEventListener('click', (e) => {
    if (e.target === confirmModal) hideConfirmModal();
  });

  // Modal Confirm
  modalConfirmBtn.addEventListener('click', () => {
    if (typeof pendingModalAction === 'function') {
      pendingModalAction();
    }
    hideConfirmModal();
  });

  // Delegate Items Container events
  setupItemDelegation();
}

// Switch between Plan tab and Store Quick-Add tab
function switchTab(tab) {
  if (tab === 'plan') {
    tabPlanBtn.className = 'flex-1 py-2 px-3 rounded-xl transition text-center flex items-center justify-center gap-1.5 bg-white text-indigo-700 shadow-sm font-semibold';
    tabStoreBtn.className = 'flex-1 py-2 px-3 rounded-xl transition text-center flex items-center justify-center gap-1.5 text-slate-600 hover:text-slate-900 font-semibold';
    planForm.classList.remove('hidden');
    storeForm.classList.add('hidden');
  } else {
    tabStoreBtn.className = 'flex-1 py-2 px-3 rounded-xl transition text-center flex items-center justify-center gap-1.5 bg-emerald-600 text-white shadow-sm font-semibold';
    tabPlanBtn.className = 'flex-1 py-2 px-3 rounded-xl transition text-center flex items-center justify-center gap-1.5 text-slate-600 hover:text-slate-900 font-semibold';
    planForm.classList.add('hidden');
    storeForm.classList.remove('hidden');
  }
}

// Switch mode in on-the-fly store form
function setStoreFormMode(mode) {
  state.storeFormMode = mode;
  if (mode === 'unit') {
    storeModeUnit.className = 'py-2 px-2 text-xs font-bold rounded-lg transition text-center shadow-sm bg-white text-emerald-700';
    storeModeTotal.className = 'py-2 px-2 text-xs font-bold rounded-lg transition text-center text-slate-600 hover:text-slate-900';
    storeModeHint.textContent = t('modeUnitHint');
  } else {
    storeModeTotal.className = 'py-2 px-2 text-xs font-bold rounded-lg transition text-center shadow-sm bg-white text-emerald-700';
    storeModeUnit.className = 'py-2 px-2 text-xs font-bold rounded-lg transition text-center text-slate-600 hover:text-slate-900';
    storeModeHint.textContent = t('modeTotalHint');
  }
}

// Change list filter
function setFilter(filter) {
  state.filter = filter;

  const baseClass = 'filter-btn whitespace-nowrap flex-1 sm:flex-none py-1.5 px-3 rounded-lg text-xs transition select-none';

  [filterAll, filterPending, filterInCart].forEach(btn => {
    btn.className = `${baseClass} text-slate-600 hover:text-slate-900 font-semibold`;
  });

  if (filter === 'all') {
    filterAll.className = `${baseClass} bg-white text-slate-900 shadow-sm font-bold`;
  } else if (filter === 'pending') {
    filterPending.className = `${baseClass} bg-white text-indigo-700 shadow-sm font-bold`;
  } else if (filter === 'inCart') {
    filterInCart.className = `${baseClass} bg-white text-emerald-700 shadow-sm font-bold`;
  }

  renderItemsList();
}

// Modal management
function showConfirmModal(title, desc, action) {
  modalTitle.textContent = title;
  modalDesc.textContent = desc;
  if (modalCancelBtn) modalCancelBtn.textContent = t('modalCancel');
  if (modalConfirmBtn) modalConfirmBtn.textContent = t('modalConfirm');
  pendingModalAction = action;
  confirmModal.classList.remove('hidden');
  confirmModal.classList.add('flex');
}

function hideConfirmModal() {
  confirmModal.classList.add('hidden');
  confirmModal.classList.remove('flex');
  pendingModalAction = null;
}

// Event delegation for items in list (instant updates on typing, toggles, deletion)
function setupItemDelegation() {
  // Checkbox toggle: "В корзине" / "In cart"
  itemsContainer.addEventListener('change', (e) => {
    const target = e.target;
    const card = target.closest('.item-card');
    if (!card) return;
    const itemId = card.dataset.id;
    const item = state.items.find(i => i.id === itemId);
    if (!item) return;

    if (target.classList.contains('item-in-cart-checkbox')) {
      const isChecked = target.checked;
      item.inCart = isChecked;

      // Immediately update visual state and numbers
      updateCardVisualState(card, item);
      renderSummary();

      // Rearrange item position:
      // When checked -> move to the very bottom of the list
      // When unchecked -> return to the pending items group (before in-cart items)
      const currentIndex = state.items.findIndex(i => i.id === itemId);
      if (currentIndex !== -1) {
        state.items.splice(currentIndex, 1);
        if (isChecked) {
          state.items.push(item);
        } else {
          const firstInCartIndex = state.items.findIndex(i => i.inCart);
          if (firstInCartIndex !== -1) {
            state.items.splice(firstInCartIndex, 0, item);
          } else {
            state.items.push(item);
          }
        }
      }

      saveToStorage();

      // Smooth delay so the user sees the checkmark animation before it moves to the bottom
      clearTimeout(reorderTimeout);
      reorderTimeout = setTimeout(() => {
        renderItemsList();
      }, 280);
      return;
    }

    if (target.classList.contains('item-unit-select')) {
      item.unit = target.value;
      saveToStorage();
      renderSummary();
      updateItemSubtotalDisplay(card, item);
      return;
    }
  });

  // Inputs: instant price & quantity recalculation while typing
  itemsContainer.addEventListener('input', (e) => {
    const target = e.target;
    const card = target.closest('.item-card');
    if (!card) return;
    const itemId = card.dataset.id;
    const item = state.items.find(i => i.id === itemId);
    if (!item) return;

    // Price input change
    if (target.classList.contains('item-price-input')) {
      item.price = target.value;
      saveToStorage();
      renderSummary();
      updateItemSubtotalDisplay(card, item);
      return;
    }

    // Inline quantity input change
    if (target.classList.contains('item-qty-input')) {
      item.quantity = target.value;
      saveToStorage();
      renderSummary();
      updateItemSubtotalDisplay(card, item);
      return;
    }

    // Editable name change (supports any language text entry)
    if (target.classList.contains('item-name-input')) {
      item.name = target.value;
      saveToStorage();
      return;
    }
  });

  // Clicks: Mode switches, +/- quantity buttons, and delete
  itemsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const card = btn.closest('.item-card');
    if (!card) return;
    const itemId = card.dataset.id;
    const item = state.items.find(i => i.id === itemId);
    if (!item) return;

    // Delete item
    if (btn.classList.contains('btn-delete-item')) {
      state.items = state.items.filter(i => i.id !== itemId);
      saveToStorage();
      render();
      return;
    }

    // Quantity Plus
    if (btn.classList.contains('btn-qty-plus')) {
      const step = item.unit === 'кг' || item.unit === 'л' ? 0.5 : (item.unit === 'г' ? 100 : 1);
      item.quantity = Math.round(((item.quantity || 0) + step) * 100) / 100;
      const qtyInput = card.querySelector('.item-qty-input');
      if (qtyInput) qtyInput.value = item.quantity;
      saveToStorage();
      renderSummary();
      updateItemSubtotalDisplay(card, item);
      return;
    }

    // Quantity Minus
    if (btn.classList.contains('btn-qty-minus')) {
      const step = item.unit === 'кг' || item.unit === 'л' ? 0.5 : (item.unit === 'г' ? 100 : 1);
      const newQty = Math.round(((item.quantity || 0) - step) * 100) / 100;
      if (newQty > 0) {
        item.quantity = newQty;
        const qtyInput = card.querySelector('.item-qty-input');
        if (qtyInput) qtyInput.value = item.quantity;
        saveToStorage();
        renderSummary();
        updateItemSubtotalDisplay(card, item);
      }
      return;
    }

    // Mode Toggle: Mode A ("За 1 ед.")
    if (btn.classList.contains('btn-mode-unit')) {
      if (item.pricingMode !== 'unit') {
        item.pricingMode = 'unit';
        saveToStorage();
        updateModeToggleUI(card, 'unit');
        renderSummary();
        updateItemSubtotalDisplay(card, item);
      }
      return;
    }

    // Mode Toggle: Mode B ("За всё")
    if (btn.classList.contains('btn-mode-total')) {
      if (item.pricingMode !== 'total') {
        item.pricingMode = 'total';
        saveToStorage();
        updateModeToggleUI(card, 'total');
        renderSummary();
        updateItemSubtotalDisplay(card, item);
      }
      return;
    }

    // Grams helper quick switch to Mode B
    if (btn.classList.contains('btn-switch-to-total')) {
      item.pricingMode = 'total';
      saveToStorage();
      updateModeToggleUI(card, 'total');
      renderSummary();
      updateItemSubtotalDisplay(card, item);
      return;
    }
  });
}

// Update single card's visual in-cart highlight without re-rendering everything
function updateCardVisualState(card, item) {
  const isChecked = item.inCart;
  const cardCheckbox = card.querySelector('.item-in-cart-checkbox');
  if (cardCheckbox) cardCheckbox.checked = isChecked;

  const cardTitle = card.querySelector('.item-title-display');
  const cardBadge = card.querySelector('.item-cart-status');

  if (isChecked) {
    card.classList.add('is-in-cart');
    if (cardTitle) {
      cardTitle.classList.add('line-through', 'text-emerald-800');
    }
    if (cardBadge) {
      cardBadge.textContent = t('inCartStatus');
      cardBadge.className = 'item-cart-status text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1';
    }
  } else {
    card.classList.remove('is-in-cart');
    if (cardTitle) {
      cardTitle.classList.remove('line-through', 'text-emerald-800');
    }
    if (cardBadge) {
      cardBadge.textContent = t('inListStatus');
      cardBadge.className = 'item-cart-status text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 flex items-center gap-1';
    }
  }
}

// Update Mode segmented button UI within card
function updateModeToggleUI(card, activeMode) {
  const btnUnit = card.querySelector('.btn-mode-unit');
  const btnTotal = card.querySelector('.btn-mode-total');
  const gramsTip = card.querySelector('.grams-smart-tip');
  const descText = card.querySelector('.mode-desc-text');

  if (descText) {
    descText.textContent = activeMode === 'total' 
      ? t('modeDescTotal') 
      : t('modeDescUnit');
  }

  if (btnUnit && btnTotal) {
    if (activeMode === 'unit') {
      btnUnit.className = 'btn-mode-unit flex-1 py-1 px-2 text-xs font-bold rounded-md bg-white text-indigo-700 shadow-sm transition';
      btnTotal.className = 'btn-mode-total flex-1 py-1 px-2 text-xs font-semibold rounded-md text-slate-500 hover:text-slate-800 transition';
      if (gramsTip) gramsTip.classList.remove('hidden');
    } else {
      btnTotal.className = 'btn-mode-total flex-1 py-1 px-2 text-xs font-bold rounded-md bg-white text-emerald-700 shadow-sm transition';
      btnUnit.className = 'btn-mode-unit flex-1 py-1 px-2 text-xs font-semibold rounded-md text-slate-500 hover:text-slate-800 transition';
      if (gramsTip) gramsTip.classList.add('hidden');
    }
  }
}

// Update single item's subtotal line in card
function updateItemSubtotalDisplay(card, item) {
  const subtotalEl = card.querySelector('.item-subtotal-val');
  const formulaEl = card.querySelector('.item-calc-formula');
  const subtotal = getItemSubtotal(item);

  if (subtotalEl) {
    subtotalEl.textContent = formatLocalizedNumber(subtotal);
  }

  if (formulaEl) {
    const priceVal = parseNumber(item.price);
    if (priceVal <= 0) {
      formulaEl.textContent = t('enterPrice');
      formulaEl.className = 'item-calc-formula text-[11px] text-slate-400 italic';
    } else if (item.pricingMode === 'total') {
      formulaEl.textContent = t('fixedTotal');
      formulaEl.className = 'item-calc-formula text-[11px] text-emerald-600 font-medium';
    } else {
      const qtyStr = formatLocalizedNumber(item.quantity, 0, 2);
      const unitShortName = (t('unitShort') && t('unitShort')[item.unit]) ? t('unitShort')[item.unit] : item.unit;
      formulaEl.textContent = `${qtyStr} ${unitShortName} × ${formatLocalizedNumber(priceVal)} ${state.currency}`;
      formulaEl.className = 'item-calc-formula text-[11px] text-slate-500';
    }
  }
}

// Render Summary Bar (Bottom Sticky Bar)
function renderSummary() {
  const totalItems = state.items.length;
  const inCartItems = state.items.filter(i => i.inCart);
  const pendingItems = state.items.filter(i => !i.inCart);

  // Cart Total calculation: sum of items currently checked "В корзине"
  const cartTotal = inCartItems.reduce((acc, item) => acc + getItemSubtotal(item), 0);

  // Update counters
  countAll.textContent = totalItems;
  countPending.textContent = pendingItems.length;
  countInCart.textContent = inCartItems.length;

  // Bottom Sticky Bar values
  summaryCartTotal.textContent = formatLocalizedNumber(cartTotal);
  summaryCartRatio.textContent = `${inCartItems.length} ${t('summaryOf')} ${totalItems}`;
  summaryPendingCount.textContent = pendingItems.length;

  // Progress Bar
  const percent = totalItems > 0 ? Math.round((inCartItems.length / totalItems) * 100) : 0;
  summaryPercent.textContent = `${percent}%`;
  progressBar.style.width = `${percent}%`;

  if (percent === 100 && totalItems > 0) {
    progressBar.className = 'bg-emerald-500 h-full transition-all duration-300 ease-out';
  } else {
    progressBar.className = 'bg-indigo-600 h-full transition-all duration-300 ease-out';
  }
}

// Render Items List
function renderItemsList() {
  let displayItems = [...state.items];

  if (state.filter === 'pending') {
    displayItems = displayItems.filter(i => !i.inCart);
  } else if (state.filter === 'inCart') {
    displayItems = displayItems.filter(i => i.inCart);
  }

  // Empty state handling
  if (state.items.length === 0) {
    itemsContainer.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  } else {
    emptyState.classList.add('hidden');
  }

  if (displayItems.length === 0) {
    itemsContainer.innerHTML = `
      <div class="p-6 text-center text-slate-400 bg-white rounded-2xl border border-slate-200">
        <p class="text-sm font-medium">${escapeHTML(t('emptyTab'))}</p>
      </div>
    `;
    return;
  }

  // When viewing 'all', cleanly separate pending items on top and in-cart items at the bottom
  if (state.filter === 'all') {
    const pendingItems = displayItems.filter(i => !i.inCart);
    const inCartItems = displayItems.filter(i => i.inCart);

    if (pendingItems.length > 0 && inCartItems.length > 0) {
      const pendingHTML = pendingItems.map(item => createItemCardHTML(item)).join('');
      const inCartHTML = inCartItems.map(item => createItemCardHTML(item)).join('');

      const dividerHTML = `
        <div class="flex items-center gap-3 pt-3 pb-1 select-none">
          <div class="h-px bg-slate-200 flex-1"></div>
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/80">
            <svg class="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
            </svg>
            ${escapeHTML(t('dividerInCart'))} (${inCartItems.length})
          </span>
          <div class="h-px bg-slate-200 flex-1"></div>
        </div>
      `;

      itemsContainer.innerHTML = pendingHTML + dividerHTML + inCartHTML;
      return;
    }
  }

  itemsContainer.innerHTML = displayItems.map(item => createItemCardHTML(item)).join('');
}

// Generate HTML for an individual item card
function createItemCardHTML(item) {
  const subtotal = getItemSubtotal(item);
  const isChecked = item.inCart;
  const isTotalMode = item.pricingMode === 'total';
  const priceVal = item.price !== null && item.price !== undefined ? item.price : '';
  const isGrams = item.unit === 'г';
  const unitShortName = (t('unitShort') && t('unitShort')[item.unit]) ? t('unitShort')[item.unit] : item.unit;
  const unitsMap = t('unitShort') || { шт: 'шт', кг: 'кг', г: 'г', л: 'л', упак: 'упак' };

  return `
    <article 
      class="item-card transition-card bg-white rounded-2xl border ${isChecked ? 'is-in-cart' : 'border-slate-200'} p-3.5 shadow-sm space-y-3" 
      data-id="${item.id}"
    >
      <!-- Top Row: Checkbox, Name (supports any language text), Status, Delete -->
      <div class="flex items-start justify-between gap-2.5">
        
        <!-- Large touch-target Checkbox for iPhone Safari -->
        <label class="flex items-center gap-2.5 cursor-pointer select-none min-h-[44px]">
          <input 
            type="checkbox" 
            class="custom-checkbox item-in-cart-checkbox" 
            ${isChecked ? 'checked' : ''}
          >
          <div>
            <div class="item-title-display font-bold text-slate-900 leading-snug text-base ${isChecked ? 'line-through text-emerald-800' : ''}">
              ${escapeHTML(item.name)}
            </div>
            <div class="flex items-center gap-1.5 mt-0.5">
              <span class="item-cart-status ${isChecked ? 'text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800' : 'text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500'}">
                ${isChecked ? escapeHTML(t('inCartStatus')) : escapeHTML(t('inListStatus'))}
              </span>
            </div>
          </div>
        </label>

        <!-- Delete button -->
        <button 
          type="button" 
          class="btn-delete-item text-slate-300 hover:text-rose-500 active:text-rose-700 p-2 rounded-xl hover:bg-rose-50 transition min-w-[36px] min-h-[36px] flex items-center justify-center"
          title="${escapeHTML(t('deleteItem'))}"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <!-- Controls Grid: Quantity / Weight + Price -->
      <div class="grid grid-cols-1 xs:grid-cols-2 gap-2.5 pt-1 border-t border-slate-100">
        
        <!-- Inline Editable Quantity with +/- stepper -->
        <div class="bg-slate-50/80 p-2.5 rounded-xl border border-slate-200">
          <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            ${escapeHTML(t('qtyWeight'))}:
          </label>
          <div class="flex items-center gap-1">
            <button 
              type="button" 
              class="btn-qty-minus w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 font-bold active:bg-slate-200 flex items-center justify-center text-sm shadow-xs"
            >
              −
            </button>
            <input 
              type="text" 
              inputmode="decimal" 
              value="${item.quantity}" 
              class="item-qty-input w-full text-center font-bold text-slate-900 bg-white border border-slate-200 rounded-lg py-1 px-1.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none text-base"
            >
            <button 
              type="button" 
              class="btn-qty-plus w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 font-bold active:bg-slate-200 flex items-center justify-center text-sm shadow-xs"
            >
              +
            </button>
            
            <!-- Unit selector (localized) -->
            <select class="item-unit-select bg-transparent font-semibold text-slate-600 text-sm border-0 focus:ring-0 outline-none pl-1 pr-0 py-1">
              <option value="шт" ${item.unit === 'шт' ? 'selected' : ''}>${escapeHTML(unitsMap.шт)}</option>
              <option value="кг" ${item.unit === 'кг' ? 'selected' : ''}>${escapeHTML(unitsMap.кг)}</option>
              <option value="г" ${item.unit === 'г' ? 'selected' : ''}>${escapeHTML(unitsMap.г)}</option>
              <option value="л" ${item.unit === 'л' ? 'selected' : ''}>${escapeHTML(unitsMap.л)}</option>
              <option value="упак" ${item.unit === 'упак' ? 'selected' : ''}>${escapeHTML(unitsMap.упак)}</option>
            </select>
          </div>
        </div>

        <!-- Inline Price Input -->
        <div class="bg-slate-50/80 p-2.5 rounded-xl border border-slate-200">
          <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            ${escapeHTML(t('subtotalLabel'))}
          </label>
          <div class="relative flex items-center">
            <input 
              type="text" 
              inputmode="decimal" 
              placeholder="0.00" 
              value="${priceVal !== '' ? priceVal : ''}" 
              class="item-price-input w-full font-black text-slate-900 bg-white border border-slate-200 rounded-lg py-1 px-2.5 pr-7 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none text-base text-right"
            >
            <span class="absolute right-2.5 text-sm font-bold text-slate-400 pointer-events-none active-currency-symbol">
              ${state.currency}
            </span>
          </div>
        </div>

      </div>

      <!-- Segmented Calculation Mode: Mode A vs Mode B -->
      <div class="space-y-1.5 pt-0.5">
        <div class="flex items-center justify-between text-[11px] font-semibold text-slate-500">
          <span>${escapeHTML(t('calcModeLabel'))}</span>
          <span class="mode-desc-text text-[10px] text-slate-400">
            ${isTotalMode ? escapeHTML(t('modeDescTotal')) : escapeHTML(t('modeDescUnit'))}
          </span>
        </div>

        <!-- Compact Segmented Control (Thumb-friendly on mobile Safari) -->
        <div class="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl">
          <button 
            type="button" 
            class="btn-mode-unit flex-1 py-1 px-2 text-xs rounded-md transition ${!isTotalMode ? 'bg-white text-indigo-700 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-800 font-semibold'}"
          >
            ${escapeHTML(t('modeUnitBtn'))}
          </button>
          <button 
            type="button" 
            class="btn-mode-total flex-1 py-1 px-2 text-xs rounded-md transition ${isTotalMode ? 'bg-white text-emerald-700 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-800 font-semibold'}"
          >
            ${escapeHTML(t('modeTotalBtn'))}
          </button>
        </div>

        <!-- Smart tip for Grams -->
        ${isGrams && !isTotalMode ? `
          <div class="grams-smart-tip flex items-center justify-between bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5 text-[11px] text-amber-800">
            <span class="flex items-center gap-1">
              <span>${escapeHTML(t('gramsTip'))}</span>
            </span>
            <button type="button" class="btn-switch-to-total font-bold underline text-indigo-600 hover:text-indigo-800 ml-1">
              ${escapeHTML(t('gramsTipBtn'))}
            </button>
          </div>
        ` : ''}
      </div>

      <!-- Bottom Card Summary Line -->
      <div class="flex items-center justify-between pt-2 border-t border-slate-100">
        <div>
          <span class="item-calc-formula text-[11px] ${priceVal ? (isTotalMode ? 'text-emerald-600 font-medium' : 'text-slate-500') : 'text-slate-400 italic'}">
            ${priceVal 
              ? (isTotalMode ? escapeHTML(t('fixedTotal')) : `${formatLocalizedNumber(item.quantity, 0, 2)} ${unitShortName} × ${formatLocalizedNumber(parseNumber(priceVal))} ${state.currency}`) 
              : escapeHTML(t('enterPrice'))}
          </span>
        </div>

        <div class="flex items-baseline gap-1 bg-slate-100/70 px-2.5 py-1 rounded-lg">
          <span class="text-[11px] font-semibold text-slate-500">${escapeHTML(t('subtotalLabel'))}</span>
          <span class="item-subtotal-val font-black text-slate-900 text-base leading-none">
            ${formatLocalizedNumber(subtotal)}
          </span>
          <span class="text-xs font-bold text-slate-600 active-currency-symbol">
            ${state.currency}
          </span>
        </div>
      </div>

    </article>
  `;
}

// Simple HTML escaping helper to prevent XSS
function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Master Render
function render() {
  updateCurrencyDisplay();
  renderSummary();
  renderItemsList();
}

// Kick off when DOM is ready
document.addEventListener('DOMContentLoaded', init);
