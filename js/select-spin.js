var spinner = {
    init: function() {
        $(".spin").append("<button class=\"arrow-up\" type=\"button\"></button>");
        $(".spin").append("<button class=\"arrow-down\" type=\"button\"></button>");   
        
        var sender = this;
        $(".spin > button.arrow-up").click(function() { sender.step(this,true); });
        $(".spin > button.arrow-down").click(function() { sender.step(this,false); });
    },
    
    step: function(sender,asc) {
        var input = $(sender).parent().find("input");
        var step = input.attr("step"); 
        var min = input.attr("min");
        var max = input.attr("max");    
        if (isNaN(step) || step <= 0) step = 1;
        if (isNaN(min)) min = -Infinity;
        if (isNaN(max)) max = Infinity;
        this.doStep(input, +step, +min, +max, asc);    
    },
    
    doStep: function(sender,step,min,max,asc) {
        var curr = sender.val();
        var res = asc ?  +curr + step : +curr - step;
        if (res > max) res = max;
        if (res < min) res = min;
        sender.val(res);     
    }
};

var select = {
    init: function() {    
        this.create();                                            
        $(".dropdown-wrap label").click(function(e) {            
                e.stopPropagation();
                var $input = $(this);
                var $ul = $input.next();                
                $ul.toggle();
                $ul.addClass("curr");
                $(".dropdown-wrap ul:not(.curr)").hide();
                $ul.removeClass("curr");
        });
        
        $(".dropdown-wrap li").click(function(e) {       
            e.stopPropagation();
            var $this = $(this);
            if (!$this.hasClass("caption")) {
                var $ul = $this.parent();
                var $label = $ul.prev();
                var item = $this.text();
                $label.text(item);                
                if (!$label.hasClass("active")) $label.addClass("active");                
                var $select = $ul.parent().prev();
                $select.val(item);
                $ul.hide();
            }
        });
        
        $(document).click(function() {            
            $(".dropdown-wrap > ul").hide();
        });
    },
    
    create: function() {
        $(".dropdown").each(function() {
            var $this = $(this);
            var cssClass = $this.attr("class").replace("dropdown", "dropdown-wrap");
            $this.after("<div class=\"" + cssClass + "\"></div>"); 
            var placeholder = $this.attr("placeholder");            
            var $wrap = $this.next(".dropdown-wrap");
            var beginTag = placeholder ? "<label>" : "<label class=\"active\">" 
            placeholder = placeholder ? placeholder : $this.find("option").eq(0).text();
            $wrap.append(beginTag + placeholder  + "</label>");            
            $wrap.append("<ul></ul>");
            var $ul = $this.next(".dropdown-wrap").children("ul");                                                                        
            var $groups = $this.find("optgroup");
            var numberOfGroups = $groups.length; 
            //Copy options (if there's no optgroups)
            if (numberOfGroups == 0) 
            {
                var $options = $this.children("option");
                var numberOfOptions = $options.length;
                for (var i = 0; i < numberOfOptions; i++){
                    $ul.append("<li>" + $options.eq(i).text() + "</li>");    
                }
            }
            //Copy option groups
            for (var i = 0; i < numberOfGroups; i++){
                var label = $groups.eq(i).attr("label");                
                $ul.append("<li class=\"caption\">" + label + "</li>");
                
                var $options = $groups.eq(i).children("option");
                var numberOfOptions = $options.length;
                for (var j = 0; j < numberOfOptions; j++){
                    $ul.append("<li>" + $options.eq(j).text() + "</li>");    
                }
            }                        
            $this.hide();
        });         
    }
};

$(function() {
	spinner.init();
	select.init();
});