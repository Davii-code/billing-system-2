import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMessageOkComponent } from './dialog-message-ok.component';

describe('DialogMessageOkComponent', () => {
  let component: DialogMessageOkComponent;
  let fixture: ComponentFixture<DialogMessageOkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogMessageOkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogMessageOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
