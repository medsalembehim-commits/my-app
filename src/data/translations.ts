import type { Language, MotivationCategory } from '../types/journey';

export interface Translations {
  appName: string;
  slogan: string;
  nav: {
    home: string;
    journey: string;
    motivation: string;
    journal: string;
    settings: string;
  };
  onboarding: {
    welcomeTitle: string;
    welcomeSubtitle: string;
    chooseLanguage: string;
    stepLabel: string;
    habitLabel: string;
    habitPlaceholder: string;
    habitPrivacyNote: string;
    habitRequired: string;
    reasonsLabel: string;
    reasonsPlaceholder: string;
    reasonsRequired: string;
    reminderLabel: string;
    themeLabel: string;
    lightMode: string;
    darkMode: string;
    next: string;
    back: string;
    startJourney: string;
    privacyGuarantee: string;
  };
  home: {
    dayOf: string;
    dayPrefix: string;
    completedPct: string;
    daysRemaining: string;
    currentStreak: string;
    daysUnit: string;
    commitToday: string;
    committedToday: string;
    committedHint: string;
    dailyQuote: string;
    nextMilestone: string;
    allMilestonesReached: string;
    daysUntil: string;
    emergencyBtn: string;
    missedBannerTitle: string;
    missedBannerBody: string;
    openRecovery: string;
    yourWhy: string;
  };
  journey: {
    title: string;
    subtitle: string;
    calendarTitle: string;
    legendCompleted: string;
    legendPending: string;
    legendMissed: string;
    legendRecovered: string;
    dayLabel: string;
    milestonesTitle: string;
    unlockedLabel: string;
    lockedLabel: string;
    recoveryButton: string;
    recoveryModalTitle: string;
    recoveryModalBody: string;
    recoveryNoteLabel: string;
    recoveryNotePlaceholder: string;
    recoveryContinue: string;
    recoveryRecommit: string;
    cancel: string;
    recoverySuccess: string;
    historyTitle: string;
    longestStreak: string;
    completedDays: string;
  };
  motivation: {
    title: string;
    subtitle: string;
    emergencyCardTitle: string;
    emergencyCardSubtitle: string;
    emergencyBtn: string;
    featuredToday: string;
    libraryTitle: string;
    allCategories: string;
    favoritesOnly: string;
    searchPlaceholder: string;
    messagesCount: string;
    noMatches: string;
    categories: Record<MotivationCategory, string>;
    emergencyModalTitle: string;
    nextGuidance: string;
    close: string;
    suggestedAction: string;
  };
  journal: {
    title: string;
    subtitle: string;
    newEntryTitle: string;
    editEntryTitle: string;
    privacyBadge: string;
    qHowWasDay: string;
    qWhatWentWell: string;
    qWhatChallenged: string;
    qGratefulFor: string;
    placeholderGeneral: string;
    saveEntry: string;
    updateEntry: string;
    cancelEdit: string;
    validationEmpty: string;
    savedEntriesTitle: string;
    emptyStateTitle: string;
    emptyStateBody: string;
    edit: string;
    delete: string;
    confirmDelete: string;
  };
  settings: {
    title: string;
    subtitle: string;
    languageLabel: string;
    themeLabel: string;
    light: string;
    dark: string;
    notificationsTitle: string;
    reminderTimeLabel: string;
    enableNotifications: string;
    permissionStatus: string;
    permissionGranted: string;
    permissionDenied: string;
    permissionDefault: string;
    permissionUnsupported: string;
    requestPermission: string;
    sendTestNotification: string;
    testSentSuccess: string;
    notificationPrivacyNote: string;
    personalSectionTitle: string;
    habitNameLabel: string;
    personalReasonsLabel: string;
    saveChanges: string;
    savedToast: string;
    dataSectionTitle: string;
    exportData: string;
    exportDesc: string;
    resetJourney: string;
    resetDesc: string;
    resetConfirmTitle: string;
    resetConfirmBody: string;
    confirmResetBtn: string;
    privacySectionTitle: string;
    privacyPoints: string[];
  };
  notificationCopy: {
    title: string;
    bodyFallback: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    appName: '75 DAYS',
    slogan: 'You are not just leaving a habit. You are building a stronger version of yourself.',
    nav: {
      home: 'Home',
      journey: 'My Journey',
      motivation: 'Motivation',
      journal: 'Journal',
      settings: 'Settings',
    },
    onboarding: {
      welcomeTitle: '75 DAYS',
      welcomeSubtitle: 'A quiet, private companion to help you step away from one unwanted habit and build steady discipline.',
      chooseLanguage: 'Language',
      stepLabel: 'Step',
      habitLabel: 'What unwanted habit are you stepping away from?',
      habitPlaceholder: 'e.g., Late-night scrolling, smoking, impulsive snacking',
      habitPrivacyNote: 'Stored strictly on your device. Never shown in notifications.',
      habitRequired: 'Please enter a personal name for the habit you want to leave.',
      reasonsLabel: 'Why does this change matter to you?',
      reasonsPlaceholder: 'Write the personal reasons you want to remember on harder days...',
      reasonsRequired: 'Write at least one personal reason to anchor your journey.',
      reminderLabel: 'Daily Reminder Time',
      themeLabel: 'Appearance',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
      next: 'Continue',
      back: 'Back',
      startJourney: 'Start 75-Day Journey',
      privacyGuarantee: '100% offline & private on this device. No account required.',
    },
    home: {
      dayOf: 'of 75',
      dayPrefix: 'Day',
      completedPct: 'Completed',
      daysRemaining: 'Days Remaining',
      currentStreak: 'Current Streak',
      daysUnit: 'days',
      commitToday: 'Commit Today',
      committedToday: 'Committed Today',
      committedHint: 'Today’s promise is recorded. Rest steadily.',
      dailyQuote: 'Daily Word',
      nextMilestone: 'Next Milestone',
      allMilestonesReached: 'All 6 milestones unlocked. Finish strong.',
      daysUntil: 'days to unlock',
      emergencyBtn: 'Emergency Motivation',
      missedBannerTitle: 'Missed days detected',
      missedBannerBody: 'Your past progress is safe. You can acknowledge missed days gently and keep moving forward.',
      openRecovery: 'Recover Gently',
      yourWhy: 'Your Personal Anchor',
    },
    journey: {
      title: 'My Journey',
      subtitle: 'Seventy-five deliberate calendar days. Historical progress is always preserved.',
      calendarTitle: '75-Day Discipline Grid',
      legendCompleted: 'Completed',
      legendPending: 'Upcoming',
      legendMissed: 'Missed',
      legendRecovered: 'Recovered',
      dayLabel: 'Day',
      milestonesTitle: 'Milestone Badges',
      unlockedLabel: 'Unlocked',
      lockedLabel: 'Locked',
      recoveryButton: 'Supportive Recovery',
      recoveryModalTitle: 'Reset Without Shame',
      recoveryModalBody: 'A difficult day does not erase the discipline you have already built. Choose how you want to move forward from here:',
      recoveryNoteLabel: 'Optional reflection (private)',
      recoveryNotePlaceholder: 'What triggered the gap, and what one boundary will help tomorrow?',
      recoveryContinue: 'Acknowledge & Continue Forward',
      recoveryRecommit: 'Acknowledge & Commit Today',
      cancel: 'Cancel',
      recoverySuccess: 'Journey stabilized. Past completed days remain intact.',
      historyTitle: 'Consistency Overview',
      longestStreak: 'Longest Streak',
      completedDays: 'Total Completed',
    },
    motivation: {
      title: 'Motivation',
      subtitle: '108 original reflections in English and Arabic for steady resolve.',
      emergencyCardTitle: 'Feeling a sudden urge?',
      emergencyCardSubtitle: 'Pause for sixty seconds with calm, immediate perspective.',
      emergencyBtn: 'Emergency Motivation',
      featuredToday: 'Today’s Reflection',
      libraryTitle: 'Discipline Library',
      allCategories: 'All',
      favoritesOnly: 'Saved',
      searchPlaceholder: 'Search reflections...',
      messagesCount: 'reflections',
      noMatches: 'No reflections match your current filter.',
      categories: {
        discipline: 'Discipline',
        patience: 'Patience',
        'self-control': 'Self-control',
        confidence: 'Confidence',
        consistency: 'Consistency',
        'starting-again': 'Starting again',
      },
      emergencyModalTitle: 'Steady Yourself',
      nextGuidance: 'Another Perspective',
      close: 'Return Calmly',
      suggestedAction: 'Immediate Grounding Step',
    },
    journal: {
      title: 'Private Journal',
      subtitle: 'Honest evening reflection stored only on your device.',
      newEntryTitle: 'Daily Reflection',
      editEntryTitle: 'Edit Reflection',
      privacyBadge: 'Device-only · Private',
      qHowWasDay: 'How was your day?',
      qWhatWentWell: 'What went well?',
      qWhatChallenged: 'What challenged you?',
      qGratefulFor: 'What are you grateful for?',
      placeholderGeneral: 'Write briefly and honestly...',
      saveEntry: 'Save Reflection',
      updateEntry: 'Update Reflection',
      cancelEdit: 'Cancel',
      validationEmpty: 'Please answer at least one reflection prompt before saving.',
      savedEntriesTitle: 'Past Reflections',
      emptyStateTitle: 'No reflections yet',
      emptyStateBody: 'Taking two minutes each evening clarifies patterns and strengthens resolve.',
      edit: 'Edit',
      delete: 'Delete',
      confirmDelete: 'Confirm Delete',
    },
    settings: {
      title: 'Settings',
      subtitle: 'Language, appearance, reminder schedule, and private data controls.',
      languageLabel: 'Language & Layout',
      themeLabel: 'Theme',
      light: 'Light',
      dark: 'Dark',
      notificationsTitle: 'Daily Reminders',
      reminderTimeLabel: 'Reminder Time',
      enableNotifications: 'Enable daily reminders',
      permissionStatus: 'Permission status',
      permissionGranted: 'Allowed',
      permissionDenied: 'Blocked in browser',
      permissionDefault: 'Not requested yet',
      permissionUnsupported: 'Not supported in this browser',
      requestPermission: 'Allow Notifications',
      sendTestNotification: 'Send Preview Notification',
      testSentSuccess: 'Preview notification sent (without your private habit name).',
      notificationPrivacyNote: 'Privacy rule: Notifications never display your private habit name by default.',
      personalSectionTitle: 'Personal Journey Details',
      habitNameLabel: 'Private Habit Name',
      personalReasonsLabel: 'Personal Reasons for Changing',
      saveChanges: 'Save Personal Details',
      savedToast: 'Personal details saved locally.',
      dataSectionTitle: 'Data & Journey Control',
      exportData: 'Export Personal Data (JSON)',
      exportDesc: 'Download a local backup of your progress, milestones, and private journal.',
      resetJourney: 'Reset 75-Day Journey',
      resetDesc: 'Clears check-ins and starts fresh from Day 1 after confirmation.',
      resetConfirmTitle: 'Reset your 75-day journey?',
      resetConfirmBody: 'This will clear your current check-ins and start a fresh 75-day count. Your journal entries can be exported first if you want to keep a copy.',
      confirmResetBtn: 'Yes, Reset Journey',
      privacySectionTitle: 'Privacy Information',
      privacyPoints: [
        'All check-ins, habit names, personal reasons, and journal entries remain strictly on your device.',
        'Works offline without mandatory servers, accounts, or analytics tracking.',
        'Reminder notifications use calm generic language and never reveal your private habit name.',
      ],
    },
    notificationCopy: {
      title: '75 DAYS · Daily Check-in',
      bodyFallback: 'Take a calm moment to honor today’s commitment.',
    },
  },
  ar: {
    appName: '٧٥ يوماً',
    slogan: 'أنت لا تترك عادةً فحسب، بل تبني نسخةً أقوى من نفسك.',
    nav: {
      home: 'الرئيسية',
      journey: 'رحلتي',
      motivation: 'التحفيز',
      journal: 'اليوميات',
      settings: 'الإعدادات',
    },
    onboarding: {
      welcomeTitle: '٧٥ يوماً',
      welcomeSubtitle: 'رفيق هادئ وخاص يساعدك على الابتعاد عن عادة غير مرغوبة وبناء انضباط راسخ.',
      chooseLanguage: 'اللغة',
      stepLabel: 'الخطوة',
      habitLabel: 'ما العادة التي قررتَ الابتعاد عنها؟',
      habitPlaceholder: 'مثال: السهر أمام الشاشات، التدخين، الأكل العشوائي',
      habitPrivacyNote: 'تُحفظ محلياً على جهازك فقط، ولا تظهر أبداً في الإشعارات.',
      habitRequired: 'يرجى كتابة اسم شخصي للعادة التي تريد تركها.',
      reasonsLabel: 'لماذا يهمّك هذا التغيير؟',
      reasonsPlaceholder: 'اكتب أسبابك الشخصية التي تريد تذكّرها في الأيام الصعبة...',
      reasonsRequired: 'اكتب سبباً شخصياً واحداً على الأقل ليكون مرساة رحلتك.',
      reminderLabel: 'وقت التذكير اليومي',
      themeLabel: 'المظهر',
      lightMode: 'الوضع الفاتح',
      darkMode: 'الوضع الداكن',
      next: 'متابعة',
      back: 'رجوع',
      startJourney: 'ابدأ رحلة الـ ٧٥ يوماً',
      privacyGuarantee: 'يعمل بالكامل دون اتصال وبخصوصية تامة على جهازك دون الحاجة لحساب.',
    },
    home: {
      dayOf: 'من ٧٥',
      dayPrefix: 'اليوم',
      completedPct: 'نسبة الإنجاز',
      daysRemaining: 'الأيام المتبقية',
      currentStreak: 'السلسلة الحالية',
      daysUnit: 'أيام',
      commitToday: 'تأكيد التزام اليوم',
      committedToday: 'تم التزام اليوم',
      committedHint: 'تم تسجيل عهد اليوم. امضِ بثبات وهدوء.',
      dailyQuote: 'كلمة اليوم',
      nextMilestone: 'المحطة القادمة',
      allMilestonesReached: 'تم فتح جميع المحطات الست. أتمم المسار بقوة.',
      daysUntil: 'أيام متبقية للوصول',
      emergencyBtn: 'تحفيز طارئ',
      missedBannerTitle: 'توجد أيام فائتة',
      missedBannerBody: 'تقدّمك السابق محفوظ بالكامل. يمكنك معالجة الأيام الفائتة بهدوء دون لوم ومتابعة المسير.',
      openRecovery: 'تعافٍ هادئ',
      yourWhy: 'مرساتك الشخصية',
    },
    journey: {
      title: 'رحلتي',
      subtitle: 'خمسة وسبعون يوماً بالتقويم الفعلي. تقدّمك التاريخي محفوظ دائماً.',
      calendarTitle: 'خريطة الـ ٧٥ يوماً',
      legendCompleted: 'منجز',
      legendPending: 'قادم',
      legendMissed: 'فائت',
      legendRecovered: 'تم تداركه',
      dayLabel: 'يوم',
      milestonesTitle: 'أوسمة المحطات',
      unlockedLabel: 'مفتوح',
      lockedLabel: 'قادم',
      recoveryButton: 'العودة بهدوء',
      recoveryModalTitle: 'إعادة التوازن دون قسوة',
      recoveryModalBody: 'يوم صعب لا يمحو الانضباط الذي بنيته سابقاً. اختر كيف تواصل من هنا:',
      recoveryNoteLabel: 'ملاحظة خاصة اختيارية',
      recoveryNotePlaceholder: 'ما الذي سبّب الفجوة، وما الحد الواحد الذي سيساعدك غداً؟',
      recoveryContinue: 'احتساب المواصلة بهدوء',
      recoveryRecommit: 'تدارك الفائت والالتزام اليوم',
      cancel: 'إلغاء',
      recoverySuccess: 'تم تثبيت المسار، وظلّت أيامك المنجزة السابقة محفوظة بالكامل.',
      historyTitle: 'ملخص الاستمرارية',
      longestStreak: 'أطول سلسلة',
      completedDays: 'مجموع المنجز',
    },
    motivation: {
      title: 'التحفيز',
      subtitle: '١٠٨ رسائل أصلية بالعربية والإنجليزية لتقوية الثبات.',
      emergencyCardTitle: 'هل تشعر برغبة مفاجئة؟',
      emergencyCardSubtitle: 'توقّف لستين ثانية مع توجيه هادئ وفوري.',
      emergencyBtn: 'تحفيز طارئ',
      featuredToday: 'رسالة اليوم',
      libraryTitle: 'مكتبة الانضباط',
      allCategories: 'الكل',
      favoritesOnly: 'المحفوظة',
      searchPlaceholder: 'ابحث في الرسائل...',
      messagesCount: 'رسالة',
      noMatches: 'لا توجد رسائل مطابقة للتصفية الحالية.',
      categories: {
        discipline: 'الانضباط',
        patience: 'الصبر',
        'self-control': 'ضبط النفس',
        confidence: 'الثقة',
        consistency: 'الاستمرارية',
        'starting-again': 'البدء من جديد',
      },
      emergencyModalTitle: 'استعد اتزانك',
      nextGuidance: 'رسالة أخرى',
      close: 'العودة بهدوء',
      suggestedAction: 'خطوة عملية فورية',
    },
    journal: {
      title: 'اليوميات الخاصة',
      subtitle: 'تأمل مسائي صادق يُحفظ محلياً على جهازك فقط.',
      newEntryTitle: 'تدوينة اليوم',
      editEntryTitle: 'تعديل التدوينة',
      privacyBadge: 'محلي على الجهاز · خاص',
      qHowWasDay: 'كيف كان يومك؟',
      qWhatWentWell: 'ما الذي سار بشكل جيد؟',
      qWhatChallenged: 'ما الذي تحدّاك اليوم؟',
      qGratefulFor: 'ما الذي تشعر بالامتنان له؟',
      placeholderGeneral: 'اكتب باختصار وصدق...',
      saveEntry: 'حفظ التدوينة',
      updateEntry: 'تحديث التدوينة',
      cancelEdit: 'إلغاء',
      validationEmpty: 'يرجى الإجابة عن سؤال واحد على الأقل قبل الحفظ.',
      savedEntriesTitle: 'التدوينات السابقة',
      emptyStateTitle: 'لا توجد تدوينات بعد',
      emptyStateBody: 'دقيقتان كل مساء تكشفان الأنماط وتزيدان ثباتك.',
      edit: 'تعديل',
      delete: 'حذف',
      confirmDelete: 'تأكيد الحذف',
    },
    settings: {
      title: 'الإعدادات',
      subtitle: 'اللغة، المظهر، وقت التذكير، والتحكم الكامل ببياناتك الخاصة.',
      languageLabel: 'اللغة والاتجاه',
      themeLabel: 'المظهر',
      light: 'فاتح',
      dark: 'داكن',
      notificationsTitle: 'التنبيهات اليومية',
      reminderTimeLabel: 'وقت التذكير',
      enableNotifications: 'تفعيل التذكير اليومي',
      permissionStatus: 'حالة الإذن',
      permissionGranted: 'مسموح',
      permissionDenied: 'محظور في المتصفح',
      permissionDefault: 'لم يُطلب بعد',
      permissionUnsupported: 'غير مدعوم في هذا المتصفح',
      requestPermission: 'السماح بالتنبيهات',
      sendTestNotification: 'إرسال تنبيه تجريبي',
      testSentSuccess: 'تم إرسال تنبيه تجريبي (دون إظهار اسم العادة).',
      notificationPrivacyNote: 'قاعدة الخصوصية: لا تعرض التنبيهات اسم العادة الخاص بك افتراضياً.',
      personalSectionTitle: 'تفاصيل الرحلة الشخصية',
      habitNameLabel: 'الاسم الخاص للعادة',
      personalReasonsLabel: 'أسبابك الشخصية للتغيير',
      saveChanges: 'حفظ التعديلات',
      savedToast: 'تم حفظ تفاصيلك محلياً.',
      dataSectionTitle: 'إدارة البيانات والرحلة',
      exportData: 'تصدير بياناتك الشخصية (JSON)',
      exportDesc: 'تنزيل نسخة احتياطية محلية من تقدّمك وأوسمتك ويومياتك.',
      resetJourney: 'إعادة ضبط رحلة الـ ٧٥ يوماً',
      resetDesc: 'يمسح سجلات الالتزام الحالية ويبدأ رحلة جديدة بعد التأكيد.',
      resetConfirmTitle: 'هل تريد إعادة ضبط رحلتك؟',
      resetConfirmBody: 'سيتم مسح أيام الالتزام الحالية والبدء من اليوم الأول مجدداً. يمكنك تصدير يومياتك أولاً إذا رغبت في الاحتفاظ بنسخة.',
      confirmResetBtn: 'نعم، إعادة الضبط',
      privacySectionTitle: 'معلومات الخصوصية',
      privacyPoints: [
        'جميع سجلات الالتزام، واسم العادة، وأسبابك الشخصية، ويومياتك تبقى على جهازك فقط.',
        'يعمل التطبيق دون اتصال ودون حسابات أو خوادم تتبع.',
        'التنبيهات اليومية تستخدم عبارات هادئة عامة ولا تكشف اسم العادة أبداً.',
      ],
    },
    notificationCopy: {
      title: '٧٥ يوماً · التزام اليوم',
      bodyFallback: 'خذ لحظة هادئة لتسجيل التزامك اليومي ومواصلة المسار.',
    },
  },
};
