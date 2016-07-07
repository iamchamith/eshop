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
   
      
    }
}