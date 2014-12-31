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

function executarServicoPost(enderecoServico, entradaServico, callbackSucesso) {
	executarServico('POST', enderecoServico, entradaServico, callbackSucesso)
}

function executarServicoGet(enderecoServico, entradaServico, callbackSucesso) {
	executarServico('GET', enderecoServico, entradaServico, callbackSucesso)
}

function executarServico(metodo, enderecoServico, entradaServico, callbackSucesso) {
	$.ajax({
	    type: metodo,
	    url: 'http://192.168.0.15:8081/PistasServices/rest/' + enderecoServico,
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