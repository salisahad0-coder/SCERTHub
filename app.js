// --- Application State ---
let currentClass = 10;
let activeTheme = 'dark';
let activeQuizCategory = null;
let currentQuestionIndex = 0;
let quizTimer = null;
let timeLeft = 15;
let score = 0;

// --- Premium Folders Data ---
const categories = [
    { id: 'study-materials', title: 'Study Materials', desc: 'സിലബസ് നോട്ടുകളും പിഡിഎഫുകളും', icon: 'fa-book-open', color: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', items: ['Short Notes', 'Detailed Notes', 'Formula Bank', 'PDF Downloads'] },
    { id: 'question-bank', title: 'Question Bank', desc: 'മുൻവർഷങ്ങളിലെ ചോദ്യപേപ്പറുകൾ', icon: 'fa-file-invoice', color: 'linear-gradient(135deg, #10b981, #047857)', items: ['Previous Year Questions', 'Chapter-wise Questions', 'Expected Questions'] },
    { id: 'smart-learning', title: 'Smart Learning', desc: 'AI അധിഷ്ഠിത ലേണിംഗ് ടൂളുകൾ', icon: 'fa-brain', color: 'linear-gradient(135deg, #a855f7, #6b21a8)', items: ['AI Tutor', 'AI Doubt Solver', 'AI Quiz Generator'] },
    { id: 'competition-zone', title: 'Competition Zone', desc: 'ലൈവ് ക്വിസുകളും റാങ്കിംഗും', icon: 'fa-trophy', color: 'linear-gradient(135deg, #f59e0b, #b45309)', items: ['Daily Quiz', 'Weekly Quiz', 'Leaderboard'] },
    { id: 'visual-learning', title: 'Visual Learning', desc: 'മൈൻഡ് മാപ്പുകളും ഫ്ലോചാർട്ടുകളും', icon: 'fa-project-diagram', color: 'linear-gradient(135deg, #ec4899, #be185d)', items: ['Mind Maps', 'Concept Maps', 'Revision Charts'] },
    { id: 'media-center', title: 'Media Center', desc: 'വീഡിയോ ട്യൂട്ടോറിയലുകൾ', icon: 'fa-play-circle', color: 'linear-gradient(135deg, #f97316, #c2410c)', items: ['Video Tutorials', 'Recorded Classes', 'Animations'] }
];

// --- Comprehensive Quiz Database ---
const quizQuestionsDb = {
    10: [
        { subject: 'Biology (ജീവശാസ്ത്രം)', q: 'പ്രകാശസംശ്ലेषണ ഘട്ടത്തിൽ പ്രകാശം ആഗിരണം ചെയ്യുന്നത് ഹരിതകത്തിലെ ഏത് ഭാഗമാണ്?', options: ['സ്ട്രോമ', 'ഗ്രാന', 'കോശഭിത്തി', 'മൈറ്റോകോൺട്രിയ'], correct: 1, exp: 'ഹരിതകണത്തിലെ ഗ്രാനയിലാണ് ക്ലോറോഫിൽ അടങ്ങിയിരിക്കുന്നത്. ഇവിടെ വെച്ചാണ് പ്രകാശഘട്ടം നടക്കുന്നത്.' },
        { subject: 'Physics (ഭൗതികശാസ്ത്രം)', q: 'ഒരു പ്രതിരോധകത്തിലൂടെയുള്ള കറന്റ് ഇരട്ടിയാക്കിയാൽ ഉത്പാദിപ്പിക്കപ്പെടുന്ന താപം എത്ര മടങ്ങാകും?', options: ['2 മടങ്ങ്', '4 മടങ്ങ്', 'പകുതി', 'മാറ്റമില്ല'], correct: 1, exp: 'ജൂൾ നിയമപ്രകാരം (H = I²Rt), താപം കറന്റിന്റെ വർഗ്ഗത്തിന് നേർാനുപാതത്തിലാണ്. അതിനാൽ 2² = 4 മടങ്ങാകും.' },
        { subject: 'Chemistry (രസതന്ത്രം)', q: 'ഏറ്റവും ഉയർന്ന ഇലക്ട്രോനെഗറ്റിവിറ്റിയുള്ള മൂലകം ഏതാണ്?', options: ['ക്ലോറിൻ', 'ഫ്ലൂറിൻ', 'ഓക്സിജൻ', 'ഹൈഡ്രജൻ'], correct: 1, exp: 'ആവർത്തനപ്പട്ടികയിൽ ഏറ്റവും കൂടുതൽ ഇലക്ട്രോനെഗറ്റിവിറ്റിയുള്ള മൂലകമാണ് ഫ്ലൂറിൻ (Fluorine).' },
        { subject: 'Malayalam (മലയാളം)', q: '"ലക്ഷ്മീദേവി എഴുന്നള്ളി വന്നു" - ഈ വാക്യത്തിലെ അലങ്കാരം ഏത്?', options: ['ഉപമ', 'രൂപകം', 'ഉത്പ്രേക്ഷ', 'അതിശയോക്തി'], correct: 1, exp: 'ഉപമേയത്തെ ഉപമാനമായി തന്നെ കൽപിക്കുന്നതാണ് രൂപകം.' },
        { subject: 'English', q: 'Identify the correct passive voice: "The chef cooked the meal."', options: ['The meal is cooked by the chef.', 'The meal was cooked by the chef.', 'The meal has cooked by the chef.', 'The chef was cooking the meal.'], correct: 1, exp: 'Simple past changes to "was/were + past participle" in passive voice.' },
        { subject: 'General Knowledge (GK)', q: 'കേരളത്തിലെ ഏറ്റവും നീളം കൂടിയ നദി ഏതാണ്?', options: ['ഭാരതപ്പുഴ', 'പെരിയാർ', 'പമ്പ', 'ചാലിയാർ'], correct: 1, exp: '244 കിലോമീറ്റർ നീളമുള്ള പെരിയാറാണ് കേരളത്തിലെ ഏറ്റവും നീളം കൂടിയ നദി.' }
    ],
    9: [
        { subject: 'Physics', q: 'ആക്കം (Momentum) അളക്കുന്ന യൂണിറ്റ് ഏത്?', options: ['m/s', 'kg m/s', 'Newton', 'Joule'], correct: 1, exp: 'Momentum = Mass × Velocity. അതുകൊണ്ട് യൂണിറ്റ് kg m/s ആണ്.' },
        { subject: 'General Knowledge', q: 'കേരളത്തിന്റെ തീരദേശ ദൈർഘ്യം എത്രയാണ്?', options: ['580 km', '680 km', '480 km', '380 km'], correct: 0, exp: 'കേരളത്തിന് ഏകദേശം 580 കിലോമീറ്റർ നീളമുള്ള കടൽതീരമുണ്ട്.' }
    ],
    8: [
        { subject: 'Biology', q: 'കോശത്തിന്റെ ഊർജ്ജനിലയം (Power house of the cell) എന്നറിയപ്പെടുന്നത് ഏത്?', options: ['ന്യൂക്ലിയസ്', 'റൈബോസോം', 'മൈറ്റോകോൺട്രിയ', 'ലൈസോസോം'], correct: 2, exp: 'കോശത്തിന് ആവശ്യമായ ഊർജ്ജം ഉത്പാദിപ്പിക്കുന്നതിനാൽ മൈറ്റോകോൺട്രിയയെ കോശത്തിന്റെ പവർ ഹൗസ് എന്ന് വിളിക്കുന്നു.' }
    ]
};

// --- View Router ---
function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    if(viewId === 'dashboard') document.getElementById('dashboard-view').classList.add('active');
    if(viewId === 'folders') document.getElementById('dashboard-view').classList.add('active');
    if(viewId === 'folder-detail') document.getElementById('folder-detail-view').classList.add('active');
    if(viewId === 'quiz') document.getElementById('quiz-view').classList.add('active');
}

// --- Render Dashboard Folders ---
function renderDashboard() {
    const container = document.getElementById('folder-container');
    container.innerHTML = '';
    categories.forEach(cat => {
        const card = document.createElement('div');
        card.className = 'premium-card';
        card.onclick = () => openFolder(cat);
        card.innerHTML = `
            <div class="card-icon-wrap" style="background: ${cat.color}">
                <i class="fas ${cat.icon}"></i>
            </div>
            <h4>${cat.title}</h4>
            <p style="color: var(--text-muted); font-size: 13px; margin-top: 5px;">${cat.desc}</p>
        `;
        container.appendChild(card);
    });
}

// --- Folder Mechanics ---
function openFolder(folder) {
    document.getElementById('detail-folder-title').innerText = folder.title;
    document.getElementById('detail-folder-desc').innerText = folder.desc;
    const iconCard = document.getElementById('detail-folder-icon');
    iconCard.innerHTML = `<i class="fas ${folder.icon}"></i>`;
    iconCard.style.background = folder.color;
    iconCard.style.color = 'white';
    iconCard.style.padding = '15px';
    iconCard.style.borderRadius = '14px';

    const subContainer = document.getElementById('subitem-container');
    subContainer.innerHTML = '';

    folder.items.forEach(item => {
        const subCard = document.createElement('div');
        subCard.className = 'subitem-card';
        subCard.onclick = () => handleSubItemClick(item, folder.title);
        subCard.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                <i class="fas fa-arrow-alt-circle-right" style="color: #2563eb"></i>
                <span style="font-weight: bold;">${item}</span>
            </div>
            <i class="fas fa-chevron-right" style="color: var(--text-muted)"></i>
        `;
        subContainer.appendChild(subCard);
    });
    showView('folder-detail');
}

// --- Subitem Router ---
function handleSubItemClick(itemName, folderName) {
    if (itemName === 'Daily Quiz') {
        startQuizArena();
    } else {
        alert(`ക്ലാസ് ${currentClass} നായുള്ള "${itemName}" ഉടൻ ലഭ്യമാകും!`);
    }
}

// --- Quiz Engine Logic ---
function startQuizArena() {
    currentQuestionIndex = 0;
    score = 0;
    showView('quiz');
    loadQuestion();
}

function loadQuestion() {
    clearInterval(quizTimer);
    const questions = quizQuestionsDb[currentClass] || quizQuestionsDb[10];
    
    if (currentQuestionIndex >= questions.length) {
        alert(`ക്വിസ് പൂർത്തിയായി! നിങ്ങളുടെ ആകെ സ്കോർ: ${score}/${questions.length}`);
        showView('dashboard');
        return;
    }

    const currentQ = questions[currentQuestionIndex];
    document.getElementById('quiz-subject').innerText = currentQ.subject;
    document.getElementById('quiz-question').innerText = currentQ.q;
    document.getElementById('quiz-feedback-card').classList.add('hidden');

    const optionsContainer = document.getElementById('quiz-options-container');
    optionsContainer.innerHTML = '';

    currentQ.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(idx, currentQ.correct, btn);
        optionsContainer.appendChild(btn);
    });

    timeLeft = 15;
    document.getElementById('timer-text').innerText = timeLeft;
    const progress = document.getElementById('quiz-progress');
    progress.style.width = '100%';
    
    quizTimer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer-text').innerText = timeLeft;
        progress.style.width = `${(timeLeft/15)*100}%`;
        if (timeLeft <= 0) {
            clearInterval(quizTimer);
            checkAnswer(-1, currentQ.correct, null); // Time out state
        }
    }, 1000);
}

function checkAnswer(selectedIndex, correctIndex, selectedBtn) {
    clearInterval(quizTimer);
    const buttons = document.querySelectorAll('.option-btn');
    const questions = quizQuestionsDb[currentClass] || quizQuestionsDb[10];
    const currentQ = questions[currentQuestionIndex];

    buttons.forEach((btn, idx) => {
        btn.style.pointerEvents = 'none'; // Disable clicking
        if (idx === correctIndex) {
            btn.classList.add('correct'); // Correct option gets Emerald green
        } else if (idx === selectedIndex) {
            btn.classList.add('incorrect'); // Incorrect option gets Ruby red
        } else {
            btn.classList.add('faded'); // Rest blurs out
        }
    });

    if (selectedIndex === correctIndex) {
        score++;
        document.getElementById('feedback-title').innerText = "ശരിയുത്തരം! 🎉";
    } else {
        document.getElementById('feedback-title').innerText = "തെറ്റായ ഉത്തരം! 💔";
    }

    document.getElementById('feedback-explanation').innerText = currentQ.exp;
    document.getElementById('quiz-feedback-card').classList.remove('hidden');
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

// --- Infrastructure Utilities ---
function setClass(classNum) {
    currentClass = classNum;
    document.querySelectorAll('.class-btn').forEach(btn => {
        btn.classList.toggle('active', btn.innerText.includes(classNum));
    });
    document.getElementById('current-class-label').innerText = `Class ${classNum} • Kerala State Syllabus SCERT`;
    renderDashboard();
}

function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        icon.className = 'fas fa-moon';
        icon.style.color = '#64748b';
    } else {
        body.classList.add('dark-mode');
        icon.className = 'fas fa-sun';
        icon.style.color = '#eab308';
    }
}

// --- App Bootstrap Initialization ---
window.onload = () => {
    renderDashboard();
};
