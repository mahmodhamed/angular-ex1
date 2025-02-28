import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagezoomComponent } from './imagezoom.component';

describe('ImagezoomComponent', () => {
  let component: ImagezoomComponent;
  let fixture: ComponentFixture<ImagezoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagezoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagezoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
