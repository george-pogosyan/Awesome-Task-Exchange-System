import { Injectable } from '@nestjs/common'
import { ICommand, ofType, Saga } from '@nestjs/cqrs'
import { map, Observable } from 'rxjs'
import { AssignTaskCommand } from 'src/commands/assign-task/assign-task.command'
import { TaskCreatedEvent } from 'src/events/task-created/task-created.event'

@Injectable()
export class AssignTaskSaga {
  @Saga()
    smsVerified = (events$: Observable<any>): Observable<ICommand> => {
      return events$.pipe(
        ofType(TaskCreatedEvent),
        map((event) => {
          return new AssignTaskCommand(
            event.id,
          )
        }),
      )
    }
}
