/**
 * Es inicializado el objeto de lenguaje con valores para el español
 *
 * @obj Seteo de valores para objeto de lenguaje español para datepicker
 */
$.datepicker.regional.es = {
    closeText: "Cerrar",
    prevText: "< Ant",
    nextText: "Sig >",
    currentText: "Hoy",
    monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Juv", "Vie", "Sáb"],
    dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"],
    weekHeader: "Sm",
    dateFormat: "dd/mm/yy",
    firstDay: 1,
    isRTL: !1,
    showMonthAfterYear: !1,
    yearSuffix: ""
}; 
$.datepicker.setDefaults($.datepicker.regional.es); //Es seteado al datepicker

/*Definición de tipo de campo "fecha - date_type", para ser agregado como filtro en el grid - start*/
var date_type = function(config) {
    jsGrid.Field.call(this, config);
};

date_type.prototype = new jsGrid.Field({
    filterTemplate: function() { //Es seteado el input para cada filtro de tipo fecha por rango
        var now = new Date();
        this._fromPicker = $("<input placeholder='Desde'>").datepicker({ //Input para fecha Desde
            defaultDate: now.setFullYear(now.getFullYear() - 1),
            dateFormat: 'dd-mm-yy' 
        });

        this._toPicker = $("<input placeholder='Hasta'>").datepicker({ //Input para fecha Hasta
            defaultDate: now.setFullYear(now.getFullYear() - 1),
            dateFormat: 'dd-mm-yy' 
        });
        return $("<div>").append(this._fromPicker).append(this._toPicker);//Es agregado al elemento del grid
    },

    filterValue: function(item) {
        return {
            /*Con esto se corrige problema en chrome windows, cuando el filtro es lanzado para la búsqueda 
            aquí la fecha es asignada ya formateada, ya que por defecto trae otro formato el cual no es reconocido el php*/
            f: this._fromPicker.datepicker().val(),
            to: this._toPicker.datepicker().val()
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
/*Definición de tipo de campo "fecha - date_type", para ser agregado como filtro en el grid - end*/