Xupnpd.module("Pages.Status", function (Status, Xupnpd, Backbone, Marionette, $, _) {


    Status.Router = Marionette.AppRouter.extend({
        appRoutes: {
            // "info": "showInfo",
            "Status": "show"
        }
    });

    var API = {
        show: function () {
            var view = new Status.view();
            Xupnpd.mainRegion.show(view);

        }
    };

    Xupnpd.on("Status:show", function () {
        Xupnpd.navigate("Status");
        API.show();
    });

    Status.model = Backbone.Model.extend({
        urlRoot: "api_v2?action=status",
        defaults: {
            uuid: "uuid",
            uptime: "uptime",
            interface: "interface",
            port: "port",
            url: "url",
            name: "name",
            version: "version",
            manufacturer: "manufacturer",
            description: "description"
        }
    });

    Status.view = Backbone.Marionette.ItemView.extend({
       template: "#status-main",
	modelEvents: {
            "sync": "onSyncModel"/*,
            "change:currentQuestionId": "onChangeCurrentQuestionId"*/
        },
       initialize: function (paramId) {
            this.model = new Status.model();
            this.model.fetch();

        },
	onSyncModel:function(){
		this.render();
	}
   });


   Xupnpd.addInitializer(function () {
       new Status.Router({
           controller: API
       });
   });


});
