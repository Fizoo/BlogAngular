import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from '@angular/router';
import {IUser} from "../../shared/interfaces";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-login-pages',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form!: FormGroup
  submitted=false
  message?:string

  constructor(
    public auth:AuthService,
    private router:Router,
    private route:ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        //map(params => params['loginAgain']),
       // tap(id => (this.id = +id))
       )
      .subscribe((params:Params)=>{
        if(params['loginAgain']){
          this.message='Enter response,please'
        }
        else if (params['authFailed']){
          this.message='Session finish.Repeat response'
        }
      });


    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }



  onSubmit() {

    if (this.form.invalid) {return}

    this.submitted=true
  /*  const user: IUser = {
      email: this.form.value.email,
      password: this.form.value.password
    }*/
    const user:IUser= this.form.value

    this.auth.login(user).subscribe(()=>{
      this.form.reset()
      this.router.navigate(['/admin','dashboard'])
      this.submitted=false
    },()=>{
      this.submitted=false
      }
    )}

  get email() {
    return this.form.controls['email']
  }
  get password() {
    return this.form.controls['password']
  }
}
