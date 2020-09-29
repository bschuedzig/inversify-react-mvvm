import { injectable } from 'inversify'

@injectable()
export abstract class ViewModel {

  /**
   * This method is called on each render making it perfectly suitable to use
   * hooks, effects, etc.
   */
  public _bind() {
    // e.g.:
    // this.history = useHistory();
    // this.params = useParams();
  }

  public onLoad = () => {
    // called when the component is activated
  }

  public onLeave = () => {
    // called when the component is deactivated
  }
}
