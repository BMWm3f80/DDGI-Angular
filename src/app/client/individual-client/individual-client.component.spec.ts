import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualClientComponent } from './individual-client.component';

describe('IndividualClientComponent', () => {
  let component: IndividualClientComponent;
  let fixture: ComponentFixture<IndividualClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
