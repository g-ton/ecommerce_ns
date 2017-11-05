var date_type = function(config) {
    jsGrid.Field.call(this, config);
};

date_type.prototype = new jsGrid.Field({
    filterTemplate: function() {
        var now = new Date();
        this._fromPicker = $("<input placeholder='Desde'>").datepicker({ 
            defaultDate: now.setFullYear(now.getFullYear() - 1),
            dateFormat: 'dd-mm-yy' 
        });

        this._toPicker = $("<input placeholder='Hasta'>").datepicker({ 
            defaultDate: now.setFullYear(now.getFullYear() - 1),
            dateFormat: 'dd-mm-yy' 
        });
        return $("<div>").append(this._fromPicker).append(this._toPicker);
    },

    filterValue: function(item) {
        return {
            f: this._fromPicker.datepicker("getDate"),
            to: this._toPicker.datepicker("getDate")
        };
    },

    itemTemplate: function(value) {
        date= new Date(value);

        month= (date.getMonth() + 1).toString();
        month = month.length > 1 ? month : '0' + month;

        day= date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return day + '-' + month + '-' +  date.getFullYear();
    },
});

jsGrid.fields.date_type = date_type;