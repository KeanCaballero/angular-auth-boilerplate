import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccountService, AlertService } from '@app/_services';
import { MustMatch } from '@app/_helpers';

@Component({
  selector: 'app-add-edit',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: 'add-edit.component.html'
})
export class AddEditComponent implements OnInit {
  form!: FormGroup;
  id?: string;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', [Validators.minLength(6), this.id ? Validators.nullValidator : Validators.required]],
      confirmPassword: ['']
    }, { validators: MustMatch('password', 'confirmPassword') });

    this.title = 'Add User';
    if (this.id) {
      this.title = 'Edit User';
      this.loading = true;
      this.accountService.getById(this.id)
        .pipe(first())
        .subscribe(x => {
          this.form.patchValue(x);
          this.loading = false;
        });
    }
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    if (this.form.invalid) return;

    this.submitting = true;
    this.saveAccount()
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('User saved', { keepAfterRouteChange: true });
          this.router.navigateByUrl('/admin/accounts');
        },
        error: err => {
          this.alertService.error(err);
          this.submitting = false;
        }
      });
  }

  private saveAccount() {
    return this.id
      ? this.accountService.update(this.id!, this.form.value)
      : this.accountService.create(this.form.value);
  }
}