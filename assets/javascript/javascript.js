/**
 *
 * @param {string} name
 * @param {number} value
 * @constructor
 */
function Currency(name, value) {
    this.name = name;
    this.value = value;

    this.getReadableValue = function() {
        return this.value.toFixed(4);
    }
}

/**
 *
 * @param {Currency} euroCurrency
 * @constructor
 */
function CurrencyConverter(euroCurrency) {
    this.euro = euroCurrency;
    this.pln = new Currency('PLN', 0);

    this.calculate = function() {
        var random = Math.random()*100;
        var plnVal = this.euro.value * 4.2 * (1+(random - 50)/1000);
        this.pln = new Currency('pln', plnVal);
    }
}

CurrencyConverter.convertFromEuroToPln = function (euroVal) {
    var euroCurrency = new Currency('euro', euroVal);
    var self = new this(euroCurrency);
    self.calculate();

    return self;
};

function DateTime() {
    this.datetime = new Date();

    this.getReadableDateTime = function () {
        var month = this.datetime.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        var day = this.datetime.getDate();
        day = day < 10 ? '0' + day : day;
        return this.datetime.getFullYear() + '.' + month + '.' + day + ' ' + this.datetime.getHours() + ':' + this.datetime.getMinutes();  }
}

function ResultsRenderer() {
    var $results = $('#results');

    /**
     *
     * @param {CurrencyConverter} currencyConverter
     * @param {DateTime} datetime
     */
    this.render = function (currencyConverter, datetime) {
        var html = '<div class="col-sm-6">' +
                        '<div class="tile tile-result">' +
                            '<h5>PLN AMOUNT</h5>' +
                            '<h6>' + currencyConverter.pln.getReadableValue() + '</h6>' +
                        '</div>' +
                        '<span class="icon-clock"></span>' +
                        '<span class="date">' + datetime.getReadableDateTime() + '</span>' +
                    '</div>';
        $results.append(html);
    }
}

(function ($) {
   var resultsRenderer = new ResultsRenderer();

    $('#convert-btn').on('click', function () {
        var $euroInput = $('#calculator-input');
        var currencyConverter = CurrencyConverter.convertFromEuroToPln($euroInput.val());
        var datetime = new DateTime();
        resultsRenderer.render(currencyConverter, datetime);
    });
})(jQuery);