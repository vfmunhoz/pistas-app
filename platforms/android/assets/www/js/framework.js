function exibirCarregando(texto) {
	$.mobile.loading( 'show', {
		text: texto,
		textVisible: true,
		theme: 'b',
		html: ""
	});
}

function esconderCarregando() {
	$.mobile.loading('hide');
}

function validarCampo(valor) {
	if(valor != undefined && valor != '') {
		return true;
	}

	return false;
}

function executarServico(enderecoServico, entradaServico, callbackSucesso) {
	$.ajax({
	    type: "POST",
	    url: 'http://192.168.0.16:8081/PistasServices/rest/' + enderecoServico,
	    dataType: 'json',
	    contentType: "application/json",
		data: JSON.stringify(entradaServico),
		success: callbackSucesso,
	    error: tratamentoErro
	});
}


function tratamentoErro() {
	esconderCarregando();
	alert('Ops! Aconteceu um erro inexperado, por favor, tente novamente mais tarde.');
}

function tratamentoErroMensagem(mensagem) {
	esconderCarregando();
	alert(mensagem);
}