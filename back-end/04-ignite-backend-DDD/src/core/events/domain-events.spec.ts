import { AggregateRoot } from "../entities/aggregate-root";
import { UniqueEntityId } from "../entities/unique-entity-id";
import { DomainEvent } from "./domain-event";
import { DomainEvents } from "./domain-events";

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date;
  private aggregate: CustomAggregate;

  constructor(aggregate: CustomAggregate) {
    this.aggregate = aggregate;
    this.ocurredAt = new Date();
  }

  public getAggregateId(): UniqueEntityId {
    return this.aggregate.id;
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null);

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate));

    return aggregate;
  }
}

describe("Domain events", async () => {
  it("shoulld be able to dispatch and listen to events", async () => {
    const callbackSpy = vi.fn();

    // Subscriber registred (lintening the event of "create response")
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name);

    // I`m creating an answer without save in my DB
    const aggregate = CustomAggregate.create();

    // I`m check of the event was created but not dispached
    expect(aggregate.domainEvents).toHaveLength(1);

    // I`m saving the answer in my DB, then dispatch the event
    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    // The subscriver listens to the event and does what needs to be done with the data
    expect(callbackSpy).toHaveBeenCalled();
    expect(aggregate.domainEvents).toHaveLength(0);
  });
});
