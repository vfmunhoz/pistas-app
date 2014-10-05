$(document).ready(function() {
	$(document).bind('deviceready', function() {
		navigator.splashscreen.hide();
	});

	$('#autenticarBtn').click(function(event) {
		event.preventDefault();
		exibirCarregando('Autenticando...');

		var dadosUsuario = {
			usuario : $('#usuario').val(),
			senha : $('#senha').val()
		}

		if(!(validarCampo(dadosUsuario.usuario) && validarCampo(dadosUsuario.senha))) {
			tratamentoErroMensagem('Preencha o usuário e a senha.');

			return;
		}

		executarServico('pistas_login/autenticar_usuario', dadosUsuario, function(data) {
			if(data.codigo != undefined) {
	    		tratamentoErroMensagem(data.mensagem);

	    		return;
	    	}

			esconderCarregando();
	    	
	    	if(data.autenticado == true) {
	    		location.hash = 'paginaInicial';
	    	} else {
	    		tratamentoErroMensagem('Usuário e senha não encontrados.');
	    	}
		});
	});
});