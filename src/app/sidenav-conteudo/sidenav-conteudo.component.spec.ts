import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavConteudoComponent } from './sidenav-conteudo.component';

describe('SidenavConteudoComponent', () => {
  let component: SidenavConteudoComponent;
  let fixture: ComponentFixture<SidenavConteudoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavConteudoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidenavConteudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
