/* =================================
------------------------------------
	Trivent| eCommerce Template
	Version: 1.0
 ------------------------------------
 ====================================*/


'use strict';


$(window).on('load', function () {
	/*------------------
		Preloder
	--------------------*/
	$(".loader").fadeOut();
	$("#preloder").delay(400).fadeOut("slow");

});

(function ($) {
	/*------------------
		Navigation
	--------------------*/
	$('.main-menu').slicknav({
		prependTo: '.main-navbar .container',
		closedSymbol: '<i class="flaticon-right-arrow"></i>',
		openedSymbol: '<i class="flaticon-down-arrow"></i>'
	});


	/*------------------
		ScrollBar
	--------------------*/
	$(".cart-table-warp, .product-thumbs").niceScroll({
		cursorborder: "",
		cursorcolor: "#afafaf",
		boxzoom: false
	});


	/*------------------
		Category menu
	--------------------*/
	$('.category-menu > li').hover(function (e) {
		$(this).addClass('active');
		e.preventDefault();
	});
	$('.category-menu').mouseleave(function (e) {
		$('.category-menu li').removeClass('active');
		e.preventDefault();
	});


	/*------------------
		Background Set
	--------------------*/
	$('.set-bg').each(function () {
		var bg = $(this).data('setbg');
		$(this).css('background-image', 'url(' + bg + ')');
	});



	/*------------------
		Hero Slider
	--------------------*/
	var hero_s = $(".hero-slider");
	hero_s.owlCarousel({
		loop: true,
		margin: 0,
		nav: true,
		items: 1,
		dots: true,
		animateOut: 'fadeOut',
		animateIn: 'fadeIn',
		navText: ['<i class="flaticon-left-arrow-1"></i>', '<i class="flaticon-right-arrow-1"></i>'],
		smartSpeed: 1200,
		autoHeight: false,
		autoplay: true,
		onInitialized: function () {
			var a = this.items().length;
			$("#snh-1").html("<span>1</span><span>" + a + "</span>");
		}
	}).on("changed.owl.carousel", function (a) {
		var b = --a.item.index, a = a.item.count;
		$("#snh-1").html("<span> " + (1 > b ? b + a : b > a ? b - a : b) + "</span><span>" + a + "</span>");

	});

	hero_s.append('<div class="slider-nav-warp"><div class="slider-nav"></div></div>');
	$(".hero-slider .owl-nav, .hero-slider .owl-dots").appendTo('.slider-nav');



	/*------------------
		Brands Slider
	--------------------*/
	$('.product-slider').owlCarousel({
		loop: true,
		nav: true,
		dots: false,
		margin: 30,
		autoplay: true,
		navText: ['<i class="flaticon-left-arrow-1"></i>', '<i class="flaticon-right-arrow-1"></i>'],
		responsive: {
			0: {
				items: 1,
			},
			480: {
				items: 2,
			},
			768: {
				items: 3,
			},
			1200: {
				items: 4,
			}
		}
	});


	/*------------------
		Popular Services
	--------------------*/
	$('.popular-services-slider').owlCarousel({
		loop: true,
		dots: false,
		margin: 40,
		autoplay: true,
		nav: true,
		navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
		responsive: {
			0: {
				items: 1,
			},
			768: {
				items: 2,
			},
			991: {
				items: 3
			}
		}
	});


	/*------------------
		Accordions
	--------------------*/
	$('.panel-link').on('click', function (e) {
		$('.panel-link').removeClass('active');
		var $this = $(this);
		if (!$this.hasClass('active')) {
			$this.addClass('active');
		}
		e.preventDefault();
	});


	/*-------------------
		Range Slider
	--------------------- */
	var rangeSlider = $(".price-range"),
		minamount = $("#minamount"),
		maxamount = $("#maxamount"),
		minPrice = rangeSlider.data('min'),
		maxPrice = rangeSlider.data('max');
	rangeSlider.slider({
		range: true,
		min: minPrice,
		max: maxPrice,
		values: [minPrice, maxPrice],
		slide: function (event, ui) {
			minamount.val('$' + ui.values[0]);
			maxamount.val('$' + ui.values[1]);
		}
	});
	minamount.val('$' + rangeSlider.slider("values", 0));
	maxamount.val('$' + rangeSlider.slider("values", 1));


	/*-------------------
		Quantity change
	--------------------- */
	$(document).ready(function () {
		var proQty = $('.pro-qty');
		proQty.prepend('<span class="dec qtybtn">-</span>');
		proQty.append('<span class="inc qtybtn">+</span>');
		proQty.on('click', '.qtybtn', function () {
			var $button = $(this);
			var oldValue = $button.parent().find('input').val();
			if ($button.hasClass('inc')) {
				var newVal = parseFloat(oldValue) + 1;
			} else {
				// Don't allow decrementing below zero
				if (oldValue > 1) {
					var newVal = parseFloat(oldValue) - 1;
				} else {
					newVal = 1;
				}
			}
			$button.parent().find('input').val(newVal);
		});
	});



	/*------------------
		Single Product
	--------------------*/
	$('.product-thumbs-track > .pt').on('click', function () {
		$('.product-thumbs-track .pt').removeClass('active');
		$(this).addClass('active');
		var imgurl = $(this).data('imgbigurl');
		var bigImg = $('.product-big-img').attr('src');
		if (imgurl != bigImg) {
			$('.product-big-img').attr({ src: imgurl });
			$('.zoomImg').attr({ src: imgurl });
		}
	});


	$('.product-pic-zoom').zoom();

	/*-------------------
			Cart
		--------------------- */
	document.addEventListener("DOMContentLoaded", function () {
		const btnAgregar = document.getElementById("add-card");

		btnAgregar.addEventListener("click", function () {
			const nombre = document.querySelector(".p-title").innerText.trim();
			const precioTexto = document.querySelector(".p-price").innerText.trim();
			const precio = parseInt(precioTexto.replace(/[^\d]/g, ""));
			const imagen = document.querySelector(".product-big-img").getAttribute("src");
			const cantidad = parseInt(document.querySelector(".pro-qty input").value) || 1;

			// Talla seleccionada
			const tallaInput = document.querySelector('input[name="sc"]:checked');
			const talla = tallaInput ? tallaInput.nextElementSibling.innerText : "Única";

			const producto = {
				nombre,
				precio,
				imagen,
				talla,
				cantidad
			};

			let carrito = JSON.parse(localStorage.getItem("cart")) || [];
			carrito.push(producto);
			localStorage.setItem("cart", JSON.stringify(carrito));

			alert(`${nombre} (Talla ${talla}) fue agregado al carrito.`);

			// Redirigir si deseas
			// window.location.href = "cart.html";
		});
	});

	/*-------------------
			Filtro por precio
		--------------------- */
	$(function () {
		$("#slider-range").slider({
			range: true,
			min: 25000,
			max: 170000,
			values: [25000, 170000],
			slide: function (event, ui) {
				$("#minamount").val("$" + ui.values[0]);
				$("#maxamount").val("$" + ui.values[1]);

				// Mostrar/ocultar productos según el precio
				$(".product-item").each(function () {
					var precio = parseInt($(this).find(".pi-text").data("precio"));
					if (precio >= ui.values[0] && precio <= ui.values[1]) {
						$(this).closest(".col-lg-4, .col-sm-6").show();
					} else {
						$(this).closest(".col-lg-4, .col-sm-6").hide();
					}
				});
			}
		});

		// Valores iniciales
		$("#minamount").val("$" + $("#slider-range").slider("values", 0));
		$("#maxamount").val("$" + $("#slider-range").slider("values", 1));
	});

	/*-------------------
			Filtro por imagenes
		--------------------- */
	document.addEventListener("DOMContentLoaded", function () {
		const productos = document.querySelectorAll('.product-item');

		productos.forEach((producto, index) => {
			const img = producto.querySelector('img');
			if (img) {
				// Extraer nombre del archivo (por ejemplo "19.png")
				const src = img.getAttribute('src');
				const nombre = src.split('/').pop().split('.')[0]; // → "19"

				// Crear un ID único basado en la imagen
				const id = 'producto-' + nombre;

				// Asignar ese ID al contenedor padre (col-lg-4...)
				const contenedor = producto.closest('.col-lg-4, .col-sm-6');
				if (contenedor) {
					contenedor.setAttribute('id', id);
				}
			}
		});
	});


	/*-------------------
		Genera lsitado de productos agregados a la pagina
		------------------*/

	document.addEventListener("DOMContentLoaded", function () {
		const productos = document.querySelectorAll('#productos .product-item');
		const lista = document.getElementById('lista-productos');
		const enlacesDiv = document.getElementById('enlaces-generados');

		// Limpiar lista antes de generar
		lista.innerHTML = "";

		productos.forEach(producto => {
			const img = producto.querySelector('img');
			const titulo = producto.querySelector('.pi-text p')?.innerText || 'Producto';

			if (img) {
				const nombre = img.src.split('/').pop().split('.')[0];
				const id = 'producto-' + nombre;

				// Asignar ID si no lo tiene
				const contenedor = producto.closest('.col-lg-4, .col-sm-6');
				if (contenedor && !contenedor.id) {
					contenedor.id = id;
				}

				// Crear <li>
				const li = document.createElement('li');
				const a = document.createElement('a');
				a.href = `#${id}`;
				a.innerHTML = `${titulo} <span>(1)</span>`;
				li.appendChild(a);
				lista.appendChild(li);

				// Evento al hacer clic en el enlace
				a.addEventListener("click", function (e) {
					e.preventDefault(); // Prevenir scroll automático
					const todos = lista.querySelectorAll('li a');
					let salida = "<h4>Enlaces generados:</h4><ul>";
					todos.forEach(link => {
						salida += `<li>${link.outerHTML}</li>`;
					});
					salida += "</ul>";
					enlacesDiv.innerHTML = salida;

					// Ir al producto también (opcional)
					document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
				});
			}
		});
	});
	/*-------------------
		Filtro por color	
		------------------*/
	document.addEventListener('DOMContentLoaded', function () {
		const radios = document.querySelectorAll('input[name="cs"]');
		const productos = document.querySelectorAll('.col-lg-4.col-sm-6');

		radios.forEach(radio => {
			radio.addEventListener('change', function () {
				const selectedId = this.id; // ejemplo: "gray-color"
				const selectedColor = selectedId.split('-')[0]; // extrae "gray"

				productos.forEach(producto => {
					const color = producto.getAttribute('data-color');
					if (color === selectedColor) {
						producto.style.display = 'block';
					} else {
						producto.style.display = 'none';
					}
					if (selectedColor === 'all') {
						productos.forEach(p => p.style.display = 'block');
					}
				});
			});
		});
	});

	/*-------------------
		Conteo de productos por color	
		------------------*/
	document.addEventListener('DOMContentLoaded', function () {
		const productos = document.querySelectorAll('.col-lg-4.col-sm-6');

		// Mapea color => cantidad
		const colorCount = {};

		productos.forEach(producto => {
			const color = producto.getAttribute('data-color');
			if (color) {
				colorCount[color] = (colorCount[color] || 0) + 1;
			}
		});

		// Actualiza los spans en los labels
		Object.keys(colorCount).forEach(color => {
			const label = document.querySelector(`label.cs-${color}`);
			if (label) {
				const span = label.querySelector('span');
				if (span) {
					span.textContent = `(${colorCount[color]})`;
				}
			}
		});
	});






})(jQuery);
