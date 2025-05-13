//Criando o CRUD - CREATE / READ / UPDATE e DELETE
$(document).ready(function () {
    //READ - GET - Mostrar os elementos na tela
    $.ajax({
        url: 'http://localhost:3333/produtos', //endereço
        method: 'GET', //tipo de requisição
        dataType: 'json', //tipo de dados
        success: function (data) {
            console.log(data)
            var table = $('#cadastro tbody') //transformo o corpo da tabela em uma variável
            $.each(data, function (index, item) {
                table.append('<tr id="line">' +
                    '<td>' + item.idProduto + '</td>' +
                    '<td>' + item.nomeProduto + '</td>' +
                    '<td>' + item.descricao + '</td>' +
                    '<td>' + item.valorUnit + '</td>' +
                    '<td>' + item.estoque + '</td>' +
                    '<td>' + item.imagem + '</td>' +
                    '<td>' + item.idCategoria + '</td>' +
                    '<td> <button type="button" class= "btn btn-success" data-bs-toggle= "modal" data-bs-target="#updateModal" data-id = "> ' + item.idProduto + 'id="btnEditar">Editar</button></td>' +

                    '<td> <button type="button" class= "btn btn-danger" data-bs-toggle= "modal" data-bs-target="#deleteModal" data-id = "> ' + item.idProduto + 'id="btnDelete">Excluir</button></td>'
                    + '</tr>'
                )
            })
        }
    })

    //Cadastro de produtos - POST
    $('#btnSalvar').on('click', function () { //Quando o botão salvar for clicado 
        $('#form').on('click', function (event) {
            event.preventDefault();
        }); //previne o envio do formulário em branco


        // ler o conteúdo dos inputs e armazená-los em variáveis

        let idProduto = $('#m-id').val();
        let nomeProduto = $('#m-nome').val();
        let descricao = $('#m-descricao').val();
        let valor = $('#m-valor').val().replace(',', '.'); //substitui a vírgula pelo ponto para enviar para o banco de dados
        let estoque = $('#m-estoque').val();
        let imagem = $('#m-imagem').val();
        let idCategoria = $('#m-categoria').val();

        //verifica se todos os campos obrigatórios estão preenchidos
        if (idProduto != '' && nomeProduto != '' && descricao != '' && valor != '' && estoque != ''  && imagem != '' && idCategoria != '' ) {
            //envia o POST

            $.ajax({
                url: 'http://localhost:3333/produtos',
                method: 'POST',
                cache: false,
                dataType: 'json',
                data: {
                    idProduto: idProduto,
                    nomeProduto: nomeProduto,
                    descricao: descricao,
                    valorUnit: valor,
                    estoque: estoque,
                    imagem: imagem,
                    idCategoria: idCategoria
                },
                success: function () {
                    alert('Produto cadastrado com sucesso!') //emito um alerta para o usuário
                    $('#form').each(function () { //a cada envio 
                        this.reset(); //Limpa o formulário 
                        $('#addModal').modal('hide') //esconde o modal
                    })
                    location.reload(); //atualiza a página com o novo produto
                }
            })
        } else {
            alert('Preencha corretamente os campos!');
            $('addModal').modal('hide');
        }

    })
});