/*
 두 개이상의 Class를 한 파일 안에 만들 경우
 public인 class 는 main을 가진 Class만이다.
*/


class Accumulator {
	
	// 멤버 필드
	int total;	// field of Instance
	static int grandTotal; // field of Class (static field)
	
	// 멤버 메서드
	void accumulate(int amount) {
		total += amount;
		grandTotal += amount;
		
	}
	
}


public class AccumulatorMain {

	public static void main(String[] args) {
		
		Accumulator acc1 = new Accumulator();
		Accumulator acc2 = new Accumulator();
		
		acc1.accumulate(100);
		acc2.accumulate(150);
		
		System.out.println("acc1.total = " + acc1.total);
//		System.out.println("acc1.grandTotal = " + acc1.grandTotal);

		System.out.println("acc2.total = " + acc2.total);
//		System.out.println("acc2.grandTotal = " + acc2.grandTotal);
	}

}
