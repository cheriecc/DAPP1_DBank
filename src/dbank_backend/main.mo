import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank{
  var currentValue: Float = 100;
  currentValue := 100;
  // Debug.print(debug_show(currentValue));

  var startTime = Time.now();
  // Debug.print(debug_show(startTime));


  let id = 45673843812347218903;

  public func topUp(amount: Float) {
    currentValue += amount;
    Debug.print(debug_show(currentValue));
  };

  public func withdrawal(amount: Float) {
    var newValue: Float = currentValue - amount;
    if (newValue >= 0) {
      currentValue -= amount;
      Debug.print(debug_show(currentValue));
    } else {
      Debug.print("withdrawal failed because the value is lower than zero");
    }
  };

  public query func checkBalance(): async Float {
    return currentValue;
  };

  public func compound() {
    let currentTime = Time.now();
    let timeElapsedNS = currentTime - startTime;
    let timeElapsedS = timeElapsedNS / 1000000000;
    currentValue := currentValue * (1.001 ** Float.fromInt(timeElapsedS));
    startTime := currentTime;
  };

}

  // Debug.print(debug_show(id));
  // public query func greet(name : Text) : async Text {
  //   return "Hello, " # name # "!";
  // };
