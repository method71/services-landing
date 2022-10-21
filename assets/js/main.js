// Прокрутка лого клиентов
var bgCaptions = () => {
	r = 100;
	adjustJank = 4;

	var captions_wrap = document.getElementsByClassName('clients_wrap');

	for (var i = captions_wrap.length - 1; i >= 0; i--) {
		var caption_wrap = captions_wrap[i];
		var caption = caption_wrap.getElementsByClassName('clients_list')[0];

		var d = caption.offsetWidth;
		caption_wrap.appendChild(caption.cloneNode(true));
		var t = d/r;

		TweenMax.to( 
			caption_wrap, t, {
				x: '-'+(d+adjustJank), 
				ease: Linear.easeNone,
				repeat: -1,
			}
		);
	}
}

// Анимация появления блоков
var animate = () => {
	var ctrl = new ScrollMagic.Controller();

	// Функция разбиения текста на слова
	const breakText = element => {
		var elementText = element.innerHTML;
		element.innerHTML = '';

		elementText.trim().split(" ").forEach(function(item, i, arr) {
			var span = document.createElement('span');
			span.innerHTML = item + ' ';
			element.appendChild(span);
		});
	};

	// Скрытие лоадера
	let loader = () => {
		var tl = new gsap.timeline();

		tl.to('#loader', {
			opacity: 0,
			duration: 1
		}).then(function() {
			document.getElementById('loader').remove();
		});
	}
	loader();

	// Первый блок
	let hero = () => {
		let background = () => {
			var tl = new gsap.timeline();

			tl.fromTo('.services_bg_image', {
				filter: "blur(4px)",
				scale: 1.1
			}, {
				filter: "blur(8px)",
				scale: 1,
				duration: 2,
				ease: Expo.easeOut,
			}, '<');

			tl.from('.services_bg_hero', {
				duration: 2,
				y: 50,
				ease: Expo.easeOut,
			}, '<');

			tl.from('.services_bg_text', {
				opacity: 0,
				scale: 1.1,
				ease: Expo.easeOut,
			}, '>-1');

			return tl;
		}

		let header = () => {
			var tl = new gsap.timeline();

			tl.from('.header_title, .header_description', {
				opacity: 0,
				x: -16,
				stagger: .1,
				duration: .3,
			});

			tl.from('.header_phone, .header_location', {
				x: 16,
				opacity: 0,
				stagger: .1,
				duration: .3,
			}, '<');

			tl.from('.mainmenu_item', {
				y: -16,
				opacity: 0,
				stagger: .1,
				duration: .3,
			});

			return tl;
		}

		let services = () => {
			var tl = new gsap.timeline();

			tl.fromTo('.services_item', {
				filter: 'blur(30px)',
				opacity: 0,
				scale: .5
			}, {
				filter: 'blur(0)',
				stagger: .1,
				opacity: 1,
				scale: 1,
				duration: .2,
			});

			return tl;
		}

		var master = gsap.timeline();
		master.add(background())
			  .add(header(), '<+.5')
			  .add(services(), '<');
	}
	hero();

	// Логотипы компаний
	let clients = () => {
		var tl = new gsap.timeline();

		tl.from('.clients_item', {
			opacity: 0,
			scale: .8,
			stagger: .1,
			duration: 1,
			ease: Expo.easeOut,
		});

		var scene = new ScrollMagic.Scene({
			triggerEelment: '.clients',
			triggerHook: .7
		})
		.setTween(tl)
		.addTo(ctrl);
	}
	clients();

	// Как мы работаем
	let perks = () => {
		var tl = new gsap.timeline();

		tl.from('.perks_bg_circle', {
			opacity: 0,
			scale: 0,
			ease: Expo.easeOut,
		});

		tl.from('.perks_bg_hero', {
			opacity: 0,
			x: 32,
			scale: .8,
			ease: Expo.easeOut,
		}, '<');

		tl.from('.perks_title, .perks_item, .perks_buttons .button', {
			stagger: 0.1,
			opacity: 0,
			y: 16,
			ease: Expo.easeOut,
		}, '<');

		var scene = new ScrollMagic.Scene({
			triggerElement: '.perks',
			triggerHook: .7
		})
		.setTween(tl)
		.addTo(ctrl);
	}
	perks();

	// Результаты работы
	let results = () => {
		var tl = new gsap.timeline();
		var tl2 = new gsap.timeline();

		tl.from('.results_title', {
			stagger: .1,
			opacity: 0,
			y: 16,
			ease: Expo.easeOut,
		});

		tl.from('.results_item', {
			stagger: .1,
			opacity: 0,
			duration: 1,
			scale: .8,
			y: 16,
			ease: Expo.easeOut,
		}, 'results_items');

		tl.from('.results_buttons .button', {
			stagger: .1,
			opacity: 0,
			y: 16,
			ease: Expo.easeOut,
		}, '<');

		tl2.fromTo('.results_photo-after', {
			width: '0%'
		}, {
			width: '100%',
			stagger: 0.3,
			duration: 1,
			ease: Expo.easeOut,
			repeat: -1,
			yoyo: true,
			repeatDelay: 1
		}, 'results_items');

		var scene = new ScrollMagic.Scene({
			triggerElement: '.results',
			triggerHook: .7
		})
		.setTween(tl)
		.addTo(ctrl);
	}
	results();

	// Зачем нужна чистка вентиляции
	let article = () => {
		var tl = new gsap.timeline();

		tl.from('.article_info, .article_image', {
			stagger: 0.1,
			opacity: 0,
			y: 16,
			ease: Expo.easeOut,
		});

		var scene = new ScrollMagic.Scene({
			triggerElement: '.article',
			triggerHook: .7
		})
		.setTween(tl)
		.addTo(ctrl);
	}
	article();
}

// Прокрутка по странице с меню
var scrollTo = () => {
	if (document.body.classList.contains('home')) {
		var menu_links = document.querySelectorAll('.mainmenu_item');

		for (var i = menu_links.length - 1; i >= 0; i--) {
			menu_links[i].addEventListener('click', function(event) {
				event.preventDefault();
				scrollTo(event.target.hash.replace('#',''));
			});
		}
	}

	var scrollTo = (id) => {
		var y = document.getElementById(id).getBoundingClientRect().top + window.pageYOffset - 24;
		window.scroll({top: y, behavior: 'smooth'});
	}
};

// Работа формы
var form = () => {
	/*
	 * Параметры
	 */

	var form_links = document.querySelectorAll('[data-form]');
	var forms = document.querySelectorAll('form[data-step]');
	var params, steps = [], current_step, current_step_n = 1;


	/*
	 * Функции
	 */

	// Создание логики формы
	var initForm = (service = false) => {
		params = {
			'phone' : '',
			'email' : '',
			'name' : '',
			'company' : '',
			'service' : '',
			'service_name' : '',
			'service_type' : '',
			'calc' : {
				'amount' : 0,
				'fields' : {}
			},
		};
		current_step = '';
		current_step_n = 1;
		steps = [];

		// Маски полей
		Inputmask({
			'mask': '8 (799) 999 99 99',
		}).mask(document.querySelector('input[name="phone"]'));

		// Установка порядка шагов
		if (service) {
			params.service = service;

			if (service !== 'cond') {
				steps.push('calc');
			}
		} else {
			steps.push('service');
		}

		steps.push('data');

		// открытие первого шага
		startStep(current_step_n);

		// Открытие формы
		openForm();
	}

	// Смена шага
	var startStep = (n = 1) => {
		if (n !== 'success') {
			var new_step_name = steps[n - 1];

			if (new_step_name == 'calc') {
				current_step = document.querySelector('.form_step[data-step='+new_step_name+'][data-service="'+params.service+'"]');
			} else {
				current_step = document.querySelector('.form_step[data-step='+new_step_name+']');
			}
		} else {
			current_step = document.querySelector('.form_step[data-step="success"]');
		}

		current_step.reset();
		if (new_step_name == 'calc') updateCalc(current_step);

		for (var i = 0; i < forms.length; i++) {
			forms[i].style.display = 'none';
		}
		current_step.style.display = 'block';

		// состояние загрузки формы
		document.querySelector('.form').classList.remove('form-loading');
	}

	// Завершение шага
	var endStep = (step) => {
		// состояние загрузки формы
		document.querySelector('.form').classList.add('form-loading');

		// Закрытие формы если это шаг успеха
		if (step.dataset.step == 'success') {
			closeForm();
			return;
		}

		// Валидация данных
		var phone_field = step.querySelector('input[name="phone"]');
		if (phone_field && !phone_field.inputmask.isComplete()) {
			step.querySelector('input[name="phone"]').focus();
			document.querySelector('.form').classList.remove('form-loading');
			return false;
		}
		
		// Преобразование введенных данных в объект
		var formData = new FormData(step),
			step_data = {};

		formData.forEach((value, key) => {
			step_data[key] = value
		});

		// Обновление параметров
		params = {...params, ...step_data};

		// Добавление калькулятора следущим шагом если выбрана соответствующая услуга
		if (step.dataset.step == 'service' && params.service !== 'cond') {
			steps.splice(current_step_n, 0, "calc");
		}

		// Очистка данных шага
		step.reset();

		// Следущий шаг
		if (current_step_n < steps.length) {
			current_step_n++;
			startStep(current_step_n);
		} else {
			saveForm();
		}
	}

	// Завершение и отправка формы
	var saveForm = () => {
		// конвертация введенных параметров в калькуляторе в ричтекст
		if (params.calc.fields) {
			var text_params = '';
			for (var key in params.calc.fields) {
				text_params += '* **'+key+'**: '+params.calc.fields[key]+'\n';
			}			
		}

		// название услуги
		switch (params.service) {
			case 'cond':
				params.service_name = 'Ремонт кондиционеров';
				break;

			case 'vent':
				params.service_name = 'Чистка вентиляции';
				break;

			case 'chim':
				params.service_name = 'Чистка дымоходов';
				break;
		}

		// send params
		// base('Заявки').create([
		// 	{
		// 		"fields": {
		// 			"Имя": params.name,
		// 			"Email": params.email,
		// 			"Название объекта": params.company,
		// 			"Услуга": params.service_name,
		// 			"Телефон": params.phone,
		// 			"Статус": "Новая",
		// 			"Сумма": params.calc.amount,
		// 			"Параметры": text_params ? text_params : '',
		// 		}
		// 	}
		// ], function(err, records) {
		// 	if (err) {
		// 		console.error(err);
		// 		alert('Произошла ошибка при сохранении данных. Пожалуйста, позвоните нам.');
		// 	} else {
		// 		ym(65551843,'reachGoal','saveForm');

		// 		// Уведомление в телеграм
		// 		var http = new XMLHttpRequest();
		// 		http.open('POST', 'https://api.telegram.org/bot1386384389:AAGMp3Gw0Fy7A-LOJDjugHIrylsFre-oJk4/sendMessage', true);
		// 		http.setRequestHeader('Content-type', 'application/json; charset=utf-8');
		// 		http.send(JSON.stringify({
		// 			chat_id: '-465586590',
		// 			parse_mode: 'Markdown',
		// 			text: '**Новая заявка** \n Телефон: '+params.phone,
		// 		}));

		// 		// Успех
		// 		startStep('success');
		// 	}
		// });

		startStep('success');
	}

	// Обновление калькулятора
	var updateCalc = (calc) => {
		var calc_type = calc.dataset.service;
		var amount = 0;
		var calc_params = {};

		params.calc.amount = 0;
		params.calc.fields = {};

		// Установка справочников стоимости
		if (calc_type == 'vent') {
			var vent_type = calc.elements['type'].value;
			var hidden_params = ['p3', 'p4', 'p5'];

			// Установка цен
			calc_params = {
				'p1' : {
					'name' : 'Кол-во',
					'cost' : vent_type == 'dust' ? 1500 : 4500,
				},

				'p2' : {
					'name' : 'Двигатель',
					'cost' : vent_type == 'dust' ? 15000 : 25000,
				},

				'p3' : {
					'name' : 'Жироуловитель',
					'cost' : vent_type == 'dust' ? 0 : 5000,
				},

				'p4' : {
					'name' : 'Вытяжной зонт',
					'cost' : vent_type == 'dust' ? 0 : 15000,
				},

				'p5' : {
					'name' : 'Водяной фильтр',
					'cost' : vent_type == 'dust' ? 0 : 25000,
				},
			}

			// Скрытие параметров для пылевой чистки
			hidden_params.forEach(function(param_name) {
				// Скрытие полей ввода
				var numberinput = document.querySelector('input[name='+param_name+']').parentElement;
				numberinput.style.display = (vent_type == 'dust') ? 'none' : 'flex';

				// Удаление параметров
				if (vent_type == 'dust') {
					delete calc_params.p3;
					delete calc_params.p4;
					delete calc_params.p5;
				}
			});
		}

		if (calc_type == 'chim') {
			var chim_type = calc.elements['type'].value;

			calc_params = {
				'p1' : {
					'name' : 'Кол-во',
					'cost' : 3000,
				},
			}
		}

		// Подсчёт стоимости и сохранение значения параметров
		if (calc_params) {	
			for (var name in calc_params) {
				params.calc.fields[calc_params[name]['name']] = calc.elements[name].value;
				amount += parseInt(calc.elements[name].value) * calc_params[name]['cost'];
			}
		}

		if (vent_type) {
			params.calc.fields = {'Тип чистки': (vent_type == 'dust' ? 'Пылевая' : 'Жировая'), ...params.calc.fields};
		}

		if (chim_type) {
			params.calc.fields = {'Тип кладки': chim_type, ...params.calc.fields};
		}

		// Установка суммы в параметры и форму
		params.calc.amount = amount;
		calc.querySelector('.form_summary_value').innerHTML = amount+'₸';
	}

	/*
	 * Анимации
	 */

	// Анимация открытия формы
	var openForm = () => {
		gsap.to('.form', {
			x: 0,
			y: 0,
			ease: Expo.easeOut,
			duration: .3
		});

		gsap.to('.overlay', {
			opacity: 1,
			visibility: 'visible',
			duration: .3
		});
	}

	// Анимация закрытия формы
	var closeForm = () => {
		gsap.to('.form', {
			x: window.innerWidth < 600 ? 0 : '100%',
			y: window.innerWidth < 600 ? '100%' : 0,
		});

		gsap.to('.overlay', {
			opacity: 0,
		}).then(function() {
			document.querySelector('.overlay').style.visibility = 'hidden';
		});
	}

	/*
	 * Обработчики
	 */

	// Открытие формы
	for (var i = form_links.length - 1; i >= 0; i--) {
		form_links[i].addEventListener('click', function(event) {
			initForm(this.dataset.service);
		});
	}

	// Закрытие формы
	document.querySelector('.overlay').addEventListener('click', function(event) {
		closeForm();
	});

	// Завершение шагов
	for (var i = forms.length - 1; i >= 0; i--) {
		var form_step = forms[i];

		// Ищем элементы списка формы и вешаем событие на отправку при их смене 
		var forms_lists = form_step.querySelectorAll('.form_list_item input');
		if (forms_lists.length) {
			for (var j = 0; j < forms_lists.length; j++) {
				forms_lists[j].addEventListener('change', function() {
					var submitEvent;
					try{
						// DOM4
						submitEvent = new Event("submit", true, true);
					}catch(error){
						// DOM2
						submitEvent = document.createEvent("Event");
						submitEvent.initEvent("submit", true, true)
					}
					form_step.dispatchEvent(submitEvent);
				});
			}
		}

		// Обрабатываем отправку формы
		forms[i].addEventListener('submit', function(event) {
			event.preventDefault();

			// Завершение шага
			endStep(current_step);
		});
	}

	// Работа числовых полей
	var numberinputs = document.querySelectorAll('.numberinput');
	for (var i = numberinputs.length - 1; i >= 0; i--) {
		var field = numberinputs[i];
		var input = field.querySelector('.numberinput_input');
		var controls = field.querySelectorAll('.numberinput_control');

		// Маска поля
		Inputmask({
			alias: 'numeric',
			digits: 0,
			max: 9999,
			allowMinus: false,
		}).mask(input);

		// Выделение всего значения при фокусировке
		input.addEventListener('focus', function() {
			this.select();
		});

		// Увеличение и уменьшения значения по нажатию
		for (var j = controls.length - 1; j >= 0; j--) {
			controls[j].addEventListener('click', function(e) {
				e.preventDefault();

				// Параметры изменения значения
				var input = this.closest('.numberinput').querySelector('.numberinput_input');
				var value = input.value ? parseInt(input.value) : 0;
				var action = this.dataset.action;

				// Изменение значения
				input.value = action == 'increase' ? value + 1 : (value > 0 ? value - 1 : 0);

				// Вызов события input
				var changeEvent;
				try{
					changeEvent = new Event("input", true, true);
				}catch(error){
					changeEvent = document.createEvent("Event");
					changeEvent.initEvent("input", true, true)
				}
				input.dispatchEvent(changeEvent);
			});
		}
	}

	// Обновление кальулятора при изменении значений полей
	var calc_forms = document.querySelectorAll('form[data-step="calc"]');
	for (var i = calc_forms.length - 1; i >= 0; i--) {
		var calc_fields = calc_forms[i].querySelectorAll('input');

		for (var j = calc_fields.length - 1; j >= 0; j--) {
			calc_fields[j].addEventListener('input', function(event) {
				updateCalc(this.closest('.form_step'));
			});
		}
	}
}

window.onload = function() {
	if (document.body.classList.contains('home')) {
		bgCaptions();
		animate();
	}

	scrollTo();
	form();
}