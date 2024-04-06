import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});
  inputBlurred: { [key: string]: boolean } = {};
  message = { text: '', type: 'default' };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      workexp: ['', [Validators.required, Validators.pattern(/^\d+(?:[,.]\d{1})?$/)]],
    });
  }

  onSubmit(form: FormGroup) {
    Object.keys(form.controls).forEach(controlName => {
      form.get(controlName)?.markAsTouched();
      form.get(controlName)?.markAsDirty();
    });

    if (form.valid) {
      console.log('Form submitted successfully');
      console.log('First name', form.value.firstname);
      console.log('Surname', form.value.lastname);
      console.log('Email', form.value.email);
      console.log('Work experience', form.value.workexp);
      this.message = { text: 'Form submitted successfully', type: 'success' };
    } else {
      Object.keys(form.controls).forEach(controlName => {
        form.get(controlName)?.markAsTouched();
      });
      
      console.log('Form has validation errors');
      this.message = { text: 'Some fields are invalid. Please fix them before submitting.', type: 'error' };
    }
  }

  onBlur(fieldName: string) {
    this.inputBlurred[fieldName] = true;
    // Run validation on the specific field on blur
    this.myForm.get(fieldName)?.updateValueAndValidity();
  }

  onReset() {
    this.myForm.reset();
    this.inputBlurred = {};
    this.message = { text: 'Form cleared', type: 'info' };
  }

  isErrorVisible(fieldName: string) {
    const control = this.myForm.get(fieldName);
    return control?.invalid && (control?.touched || this.inputBlurred[fieldName]) && control?.value !== '' || (control?.dirty && control?.value === '');
  }
}
