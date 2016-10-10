function Column(id, name) {

	var self = this;
	
	this.id = id;
	this.name = name || 'no name?';
	this.element = createColumn();

	function createColumn() {
		
		var column = $('<div class="column col-sm-3 panel-default"></div>');
		var columnTitle = $('<h2 class="column-title panel-heading">' + self.name + '</h2>');
		var columnCardList = $('<ul class="card-list list-group"></ul>');
		var columnAddCard = $('<button class="column-add-card btn btn-info">new challenge</button>');
		var columnDelete = $('<button class="btn-delete btn-sm btn-default">x</button>');
		
		columnDelete.click(function() {

			self.deleteColumn();

		});
		
		columnAddCard.click(function(event) {

			var	cardName = prompt("name me");
			event.preventDefault();
			$.ajax({

				url: baseUrl + '/card',
				method: 'POST',
				data: {

					name: cardName,
					bootcamp_kanban_column_id: self.id,

				},

				success: function(response) {

					var card = new Card(response.id, cardName);
					self.createCard(card);

				}

			});
			
		});
			
		column.append(columnTitle)
			.append(columnDelete)
			.append(columnAddCard)
			.append(columnCardList);
			return column;

		}

	}

Column.prototype = {

	createCard: function(card) {

	  this.element.children('ul').append(card.element);

	},

	deleteColumn: function() {

		var self = this;
		$.ajax({

			url: baseUrl + '/column/' + self.id,
			method: 'DELETE',
			success: function(response) {

				self.element.remove();

			}

		});

	}

};