import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Text2speechComponent } from './text2speech.component';

describe('Text2speechComponent', () => {
  let component: Text2speechComponent;
  let fixture: ComponentFixture<Text2speechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Text2speechComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Text2speechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
