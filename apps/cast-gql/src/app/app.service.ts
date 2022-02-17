import { ClientGrpc, } from '@nestjs/microservices';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Observable } from "rxjs";

interface PersonService {
  getOnePerson(data: { id: number }): Observable<any>
  getPersonImages(data: { id: number }): Observable<any>
  getPersonCredits(data: { id: number }): Observable<any>
}

@Injectable()
export class AppService implements OnModuleInit {
  private personService: PersonService;

  constructor(@Inject('CAST_PACKAGE') private client: ClientGrpc) {
  }

  onModuleInit() {
    this.personService = this.client.getService<PersonService>('CastService')
  }

  getPersonData(data) {
    return this.personService.getOnePerson(data);
  }

  getPersonImages(data) {
    return this.personService.getPersonImages(data);
  }
  getPersonCredits(data) {
    return this.personService.getPersonCredits(data);
  }
}
