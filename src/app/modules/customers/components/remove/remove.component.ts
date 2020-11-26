import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CustomerService} from '../../services/customer.service';
import {Customer} from '../../model/customer';

@Component({
  selector: 'app-note-remove',
  templateUrl: 'remove.component.html',
  styleUrls: ['./remove.component.scss']
})
export class RemoveComponent {

  public customer: Customer;

  constructor(private service: CustomerService,
              private dialogRef: MatDialogRef<RemoveComponent>,
              @Inject(MAT_DIALOG_DATA) data: {customer: Customer}) {

    this.customer = data.customer;
  }

  remove(): void {
    this.service.remove(this.customer.id).then(note => {
      this.dialogRef.close({deleted: true});
    });
  }

  close(): void {
    this.dialogRef.close({deleted: false});
  }
}
