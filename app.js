var baseUrl= 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {

	'X-Client-Id': '68', 
	'X-Auth-Token': 'ddb6928ecd60a0d6347d2f8b2d743c40'

};

$.ajaxSetup({

	headers: myHeaders

});

$.ajax({

	url: baseUrl + '/board',
	method: 'GET',
	success: function(response) {
		
		for (var i = 0; i < response.columns.length; i++) {
			var col = new Column(response.columns[i].id, response.columns[i].name);	
			board.createColumn(col);
			for (var j = 0; j < response.columns[i].cards.length; j++) {
				var card = new Card(response.columns[i].cards[j].id, response.columns[i].cards[j].name, response.columns[i].cards[j].bootcamp_kanban_column_id);
			col.createCard(card);
			}
		}
	}
});
function setupColumns(column) {
	column.forEach(function (column) {
			var col = new Column(column.id, column.name);
		board.createColumn(col);
		setupCards(col, column.cards);
	});
}

function setupCards(col, cards) {
	cards.forEach(function	(card) {
		var card = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
		col.createCard(card);
	})
}