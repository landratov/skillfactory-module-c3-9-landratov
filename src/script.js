const city_block = document.querySelector(".your-city");
const city = document.querySelector("input[name=city]");

const pref_dont_call = document.querySelector("input[name=dont-call]");
const pref_service_agree = document.querySelector("input[name=service-agree]");
const pref_dont_choose = document.querySelector("input[name=dont-choose]");
const pref_internet_freedom = document.querySelector("input[name=internet-freedom]");
const pref_age_check = document.querySelector("input[name=age-check]");
const pref_well_done = document.querySelector("input[name=well-done]");
const save_preferences = document.querySelector(".save-preferences");

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // при необходимости добавьте другие значения по умолчанию
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}

// Проверяем куки при загрузке страницы
window.onload = () => {
	if (getCookie("city") != undefined) {
		let cityLabel = document.querySelector("div.your-city label");
		let cityInput = document.querySelector("div.your-city input")
		cityLabel.remove();
		cityInput.remove();

		let cityMsg = document.createElement("h1");
		cityMsg.innerHTML = `Ваш город — ${getCookie("city")}`;

		let clearCity = document.createElement("button");
		clearCity.classList.add("btn", "btn-primary");
		clearCity.innerHTML = "Удалить";

		// По клику на кнопку удаляем куки и возвращаем обратно форму ввода
		clearCity.onclick = () => {
			deleteCookie("city");
			cityMsg.remove();
			clearCity.remove();

			cityInput.value = null;
			city_block.appendChild(cityLabel);
			city_block.appendChild(cityInput);
		};

		city_block.appendChild(cityMsg);
		city_block.appendChild(clearCity);
	}

	if (getCookie("pref_dont_call") != undefined) {
		pref_dont_call.disabled = true;
		pref_dont_call.checked = getCookie("pref_dont_call").toLowerCase() == "true" ? true: false;
		save_preferences.remove();
	}
	if (getCookie("pref_service_agree") != undefined) {
		pref_service_agree.disabled = true;
		pref_service_agree.checked = getCookie("pref_service_agree").toLowerCase() == "true" ? true: false;
		save_preferences.remove();
	}
	if (getCookie("pref_dont_choose") != undefined) {
		pref_dont_choose.disabled = true;
		pref_dont_choose.checked = getCookie("pref_dont_choose").toLowerCase() == "true" ? true: false;
		save_preferences.remove();
	}
	if (getCookie("pref_internet_freedom") != undefined) {
		pref_internet_freedom.disabled = true;
		pref_internet_freedom.checked = getCookie("pref_internet_freedom").toLowerCase() == "true" ? true: false;
		save_preferences.remove();
	}
	if (getCookie("pref_age_check") != undefined) {
		pref_age_check.disabled = true;
		pref_age_check.checked = getCookie("pref_age_check").toLowerCase() == "true" ? true: false;
	}
	if (getCookie("pref_well_done") != undefined) {
		pref_well_done.disabled = true;
		pref_well_done.checked = getCookie("pref_well_done").toLowerCase() == "true" ? true: false;
		save_preferences.remove();
	}
}

// Сохранение названия города в куки при изменения текста в поле
city.onchange = () => {
	if (city.value.length > 0) {
		setCookie("city", city.value);
	}
}

save_preferences.onclick = () => {
	setCookie("pref_dont_call", pref_dont_call.checked.toString());
	setCookie("pref_service_agree", pref_service_agree.checked.toString());
	setCookie("pref_dont_choose", pref_dont_choose.checked.toString());
	setCookie("pref_internet_freedom", pref_internet_freedom.checked.toString());
	setCookie("pref_age_check", pref_age_check.checked.toString());
	setCookie("pref_well_done", pref_well_done.checked.toString());
}