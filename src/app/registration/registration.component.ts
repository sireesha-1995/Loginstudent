import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


class Registration {
  constructor(
    public firstName: string = '',
    public email: string = '',
    public branch: string = '',
    public year: string = '',
    public city: string= '',
    public country: string = '',

  ) {}
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  // It maintains list of Registrations
  registrations: Registration[] = [];
  // It maintains registration Model
  regModel: Registration;
  // It maintains registration form display status. By default it will be false.
  showNew: boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  submitType: string = 'Save';
  // It maintains table row index based on selection.
  selectedRow: number;


  constructor( private authService: AuthService, private router: Router) {
    // Add default registration data.
    this.registrations.push(new Registration('Johan',  'johangmail.com', 'cse','1995', 'vijayawada', 'India' ));
    this.registrations.push(new Registration('Mohamed',  'tariq@gmail.com', 'ece', '1996', 'eluru','India' ));
  }

  ngOnInit() {}

  // This method associate to New Button.
  onNew() {
    // Initiate new registration.
    this.regModel = new Registration();
    // Change submitType to 'Save'.
    this.submitType = 'Save';
    // display registration entry section.
    this.showNew = true;
  }

  // This method associate to Save Button.
  onSave() {
    if (this.submitType === 'Save') {
      // Push registration model object into registration list.
      this.registrations.push(this.regModel);
    } else {
      // Update the existing properties values based on model.
      this.registrations[this.selectedRow].firstName = this.regModel.firstName;
      this.registrations[this.selectedRow].email = this.regModel.email;
      this.registrations[this.selectedRow].branch = this.regModel.branch;
      this.registrations[this.selectedRow].year = this.regModel.year;
      this.registrations[this.selectedRow].city = this.regModel.city;
      this.registrations[this.selectedRow].country = this.regModel.country;

    }
    // Hide registration entry section.
    this.showNew = false;
  }

  // This method associate to Edit Button.
  onEdit(index: number) {
    // Assign selected table row index.
    this.selectedRow = index;
    // Initiate new registration.
    this.regModel = new Registration();
    // Retrieve selected registration from list and assign to model.
    this.regModel = Object.assign({}, this.registrations[this.selectedRow]);
    // Change submitType to Update.
    this.submitType = 'Update';
    // Display registration entry section.
    this.showNew = true;
  }

  // This method associate to Delete Button.
  onDelete(index: number) {
    // Delete the corresponding registration entry from the list.
    this.registrations.splice(index, 1);
  }

  // This method associate toCancel Button.
  onCancel() {
    // Hide registration entry section.
    this.showNew = false;
  }

  logout() {
   
    this.router.navigateByUrl('/login');
  }



}
