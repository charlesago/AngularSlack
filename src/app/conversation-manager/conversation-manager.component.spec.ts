import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationManagerComponent } from './conversation-manager.component';

describe('ConversationManagerComponent', () => {
  let component: ConversationManagerComponent;
  let fixture: ComponentFixture<ConversationManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversationManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConversationManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
