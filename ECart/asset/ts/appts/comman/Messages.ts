module Ecart.Messages {

    export class sweetAlerts {
        requestConfirm(title = "success", text = ""): void {
            swal({ title: title, text: text, timer: 1000, showConfirmButton: false });
        }
        successAlert(title = "success", text="") {
            swal(title, title, "success");
        }
        errorAlert(titile = "Opps", text="Something went wrong!"):void {
            sweetAlert(titile, text, "error");
        }
        validationError(title = "Opps", errorList: any): void {

            var message = "<ul>";
            $.each(errorList, function (i, d) {
                message += "<li style='color: red'>" + d +"<li/>";
            });
            message += "</ul>";
            swal({ title: title, text: message, type:"error", html: true });
        }
      
    }
}