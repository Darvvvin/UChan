let darkMode = localStorage.getItem('darkMode');
const darkModeToggle = document.querySelector('#dark-mode-toggle');

//check if dm is enabled
//if its enabled turn it off
//if disabled turn it on!

const enableDarkMode = () => {
	//1. change css link
	document.getElementById('theme').setAttribute('href', '/css/dark-style.css');

	if(document.getElementById('logo'))
		document.getElementById('logo').setAttribute('src',  'imgs/icons/logo-dark.png');
	//2. update darkmode in the local storage
	localStorage.setItem('darkMode', 'enabled');
};

const disableDarkMode = () => {
	//1. change css link
	document.getElementById('theme').setAttribute('href', '/css/style.css');

	if(document.getElementById('logo'))
		document.getElementById('logo').setAttribute('src',  'imgs/icons/logo.png');
	//2. update darkmode in the local storage
	localStorage.setItem('darkMode', null);
};

if(darkMode === 'enabled') {
	enableDarkMode();
}

darkModeToggle.addEventListener('click', () => {
	darkMode = localStorage.getItem('darkMode');

	if(darkMode !== 'enabled') {
		enableDarkMode();
		console.log(darkMode);
	} else {
		disableDarkMode();
		console.log(darkMode);
	}
})