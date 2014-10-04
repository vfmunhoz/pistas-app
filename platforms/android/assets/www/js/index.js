$(document).ready(function() {
	$(document).bind('deviceready', function() {
		navigator.splashscreen.hide();
		
		exibirCarregando('Carregando...');
	});

	$('#paginaInicialLink').click(function() {
		var divConteudoInicial = $('#conteudoInicial');
	});
});

function exibirCarregando(texto) {
	$.mobile.loading( 'show', {
		text: texto,
		textVisible: true,
		theme: 'b',
		html: ""
	});
}
