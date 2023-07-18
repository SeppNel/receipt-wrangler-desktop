import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { ReceiptResolverService } from './receipt-resolver.service';
import { ApiModule } from 'src/api';

describe('ReceiptResolverService', () => {
  let service: ReceiptResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule, HttpClientTestingModule, NgxsModule.forRoot([])],
    });
    service = TestBed.inject(ReceiptResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
