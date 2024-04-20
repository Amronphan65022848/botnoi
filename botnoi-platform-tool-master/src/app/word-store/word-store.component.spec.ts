import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordStoreComponent } from './word-store.component';

describe('WordStoreComponent', () => {
  let component: WordStoreComponent;
  let fixture: ComponentFixture<WordStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
