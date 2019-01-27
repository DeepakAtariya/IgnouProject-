import { Component, OnInit, ViewChild } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
// import { SetupProfileService } from './setup-profile.service';
// import { Response } from '@angular/http';
// import {Location} from '@angular/common';
import * as $ from 'jquery';
import { SetupProfileService } from './setup-profile.service';
// import { AppComponent } from '../app.component';
// import { Sharing } from 'src/resources/Sharing';

@Component({
  selector: 'app-setup-profile',
  templateUrl: './setup-profile.component.html',
  styleUrls: ['./setup-profile.component.css']
})

/*  this component is responsible to fetch user remaining information,
    this component will redirect user to next component called "SetCredentials" for setting credentials to the user.
    
    */
export class SetupProfileComponent implements OnInit {

  // setupProfileData is responsible to fetch data from setupProfile form
  @ViewChild('f')  setupProfileData: NgForm;
  @ViewChild('login')  loginFormData: NgForm;
  @ViewChild('login_username') login_username : any;
  

  // form data in json format
  userData = {
    name : '',
    enrollment : '',
    program : '',
    email : '',
    mobile : '',
    password : ''
  };

  loginData ={
    username : '',
    password : ''
  };

  login_error: string;
  signup_error: string;
  // login_error : string;

  constructor(private setupProfileService : SetupProfileService){

  }

  //Initialisation with old data and validation jquery code
  ngOnInit() {
    
    // Template JS
    $(function() {
      $('#login-form-link').click(function(e) { 
      $("#loginForm").delay(50).fadeIn(50);
       $("#setupProfileForm").fadeOut(50);
      $('#register-form-link').removeClass('active');
      $(this).addClass('active');
      e.preventDefault();
    });
    $('#register-form-link').click(function(e) {
      $("#setupProfileForm").delay(50).fadeIn(50);
       $("#loginForm").fadeOut(50);
      $('#login-form-link').removeClass('active');
      $(this).addClass('active');
      e.preventDefault();
    });
  });


    

  } //end ngOnInit

  //submit data to database using laravel server
  onSubmit() {
    let setupProfileFormData = this.setupProfileData.value.setupProfileGroupData;
    this.userData.name = setupProfileFormData.name;
    this.userData.enrollment = setupProfileFormData.enrollment;
    this.userData.program = setupProfileFormData.program;
    this.userData.email = setupProfileFormData.email;
    this.userData.mobile = setupProfileFormData.mobile;
    this.userData.password = setupProfileFormData.password;
    
    // console.log(this.userData);

    var pattern = /^\d+$/;
    var email =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(this.userData.name == "" || this.userData.enrollment == "" || this.userData.program == "" || this.userData.email == "" || this.userData.password == ""){
        this.signup_error = "Enter credentials";
    }else if(!pattern.test(this.userData.enrollment)){
      this.signup_error = "Invalid enrollment format";
    }else if(!email.test(this.userData.email)){
      this.signup_error = "Invalid email";
      console.log(email.test(this.userData.email));
    }else{
      // code to store data into database if enrollment is not valid it will cause error on the screen(signup_error)

      this.setupProfileService.saveSignUpData(this.userData)
        .subscribe(data  => {

        //   const keys = data.headers.keys();
          
        //   const headers = keys.map(key =>
        // `${key}: ${data.headers.get(key)}`);
        // console.log("Headers : "+headers);

          // console.log(data['error']);
          if (data['student']=="invalid"){
            this.signup_error = "Not registered with ignou";
          }else{
            this.signup_error = "Now I can go to dashboard!";

          }
    },
    error => {
      console.log(error['error']['message']);
      var ex = error['error']['message']; 
      if(ex.search(this.userData.enrollment)){
        this.signup_error = "Already Registered";
      }else{
        this.signup_error = "";
        console.log(ex);
      }
    }
    );

    }
    



  } // end onSumit()

  onLogin(){ //start onLogin

    const loginDataToCompare = this.loginFormData.value.loginFormGroupData;
    const username = loginDataToCompare.login_username;
    const password = loginDataToCompare.login_password;
    // this.login_username.nativeElement.focus();

    // const s_username = "deepak";
    // const s_password = "deepak";

    

    if(username == "" || password == ""){
      this.login_error = "Enter credentials";
    }else if (this.checkCredentialsWithServer(username,password)){
      // this.login_error = "";
      // lets go to next page...      
    }else{
      this.login_error = "Invalid credentials";
    }


    

    
    

  } // end onLogin

 /* checking whether student is real or fake with ignou server */ 
checkWithIgnou(enrollment:any, program:any){
  if(1){
    return true;

  }else{
    return false;
  }
}

checkCredentialsWithServer(username:any, password:any){
  if(1){
    return true;

  }else{
    return false;
  }
}

  
}
