import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsynchronousDataComponent } from './asynchronous-data.component';

describe('AsynchronousDataComponent', () => {
  let component: AsynchronousDataComponent;
  let fixture: ComponentFixture<AsynchronousDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsynchronousDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsynchronousDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
