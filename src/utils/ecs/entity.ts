import { IComponent } from './components.h'

type constr<T> = { new (...args: unknown[]): T }

export abstract class  Entity {
    protected _components: IComponent[] = []

    public get Components (): IComponent[] {
        return this._components
    }

    public AddComponent (component: IComponent): void {
        this._components = [...this._components, component]
        component.Entity = this
    }

    public GetComponent <C extends IComponent> (constr: constr<C>): C {

        const component = this._components.find(c => c instanceof constr)

        if (component) {
            return component as C
        }
        
        throw new Error(`Component ${constr.name} not found on Entity ${this.constructor.name}`)
    }

    public RemoveComponent <C extends IComponent> (constr: constr<C>): void {
        this._components = this._components.filter(c => !(c instanceof constr))
    }

    public HasComponent <C extends IComponent> (constr: constr<C>): boolean {
        
        try {
            const component = this.GetComponent(constr)
            
            if (component) {
                return true
            }
        } catch (e) {
            /**
             * TODO some log
             */
        }

        return false

    } 
}