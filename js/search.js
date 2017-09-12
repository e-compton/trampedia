var idx = lunr(function () {
  var that = this;
  this.ref('key');
  that.field('title');
  that.field('content');
  Object.keys(window.store).forEach(function(key) {
    window.store[key].key = key;
    that.add(window.store[key]);
  })
});

function search(query) {
  if (query === '') {
    $('.search-results').height('0');
    $('.uk-search').attr('action', '');
    return $('.search-results').html('');
  }

  var results = idx.search(query);
  $('.search-results').html('');
  if (results.length != 0) {
    results.forEach(function (result) {
      page = window.store[result.ref];
      $('.uk-search').attr('action', `${page.url}`);
      var div = $('<div>', {class:'uk-card uk-card-body search-result'});
      div.append(`<h3><a href="${page.url}">${page.title}</a></h3>`);
      div.append(`<p>${page.content.substring(0,144)}...</p>`);
      $('.search-results').height('138px');
      $('.search-results').append(div);
    });
  } else {
    var div = $('<div>', {class:'uk-card uk-card-body'});
    div.append(`<h3>No results</h3>`);
    $('.uk-search').attr('action', '');
    $('.search-results').height('92px');
    $('.search-results').append(div);
  }
}

$(document).on('input', function (e) {
  search($('.uk-search-input').val());
});

window.onload = function () {
  $('.uk-navbar-toggle').click(function (e) {
    $('.search-results').html('');
    $('.search-results').height('0');
  });
}
