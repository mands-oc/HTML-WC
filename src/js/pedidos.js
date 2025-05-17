$(document).ready(function () {
    function formatarData(dataISO) {
        const data = new Date(dataISO);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    $.ajax({
        url: 'http://localhost:3333/pedidos',
        method: 'GET',
        dataType: 'json',

        success: function (data) {
            console.log(data)
            var table = $('#cadastro tbody')
            $.each(data, function (index, item) {
                const dataFormatada = formatarData(item.dataPedido);

                table.append('<tr id="line">' +
                    '<td id="code">' + item.idPedido + '</td>' +
                    '<td>' + item.cpf + '</td>' +
                    '<td>' + dataFormatada + '</td>' +
                    '<td>' + item.qtItens + '</td>' +
                    '<td>' + item.valorTotal + '</td>' +
                    '<td>' + item.formaPagto + '</td>' +
                    '</tr>'
                );
            });
        }
    });
});
