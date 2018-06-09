import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShoppingListComponent } from './create-shopping-list.component';

describe('CreateShoppingListComponent', () => {
  let component: CreateShoppingListComponent;
  let fixture: ComponentFixture<CreateShoppingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateShoppingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
