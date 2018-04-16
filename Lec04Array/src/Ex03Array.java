
public class Ex03Array {

	public static void main(String[] args) {

		// EXAM) 로또
		// 섞은 후, index 0~5까지 값 출력

		int[] lotto = new int[45];

		for (int i = 0; i < lotto.length; i++) {
			lotto[i] = (i + 1);
			System.out.print(lotto[i] + ", ");
		}
		System.out.println();
		// lotto = { 1, 2, 3, 4, 5, ... 43, 44, 45 }, 순차적인 값들이 배열 안으로 들어감.
		
		// for 문을 돌려 임의의 위치의 값과 swap
		int ri, temp;
		for(int i = 0; i < 100; i++) {
			ri = (int)(Math.random() * 45); 
			temp = lotto[0];
			lotto[0] = lotto[ri];
			lotto[ri] = temp;
		}

		// print lotto[0] ~ lotto[5]
		System.out.print("Six number: ");
		for (int i = 0; i < 6; i++) {
			System.out.print(lotto[i] + ", ");
		}
		System.out.println();

		
	}
}
