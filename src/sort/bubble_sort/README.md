# 冒泡排序

```c
int main()
{
	// 冒泡排序：从小到大排列
	int array[] = { 32, 40, 15, 70, 5, 2, 10 };
	printf("排序前: \t");

	int length = sizeof(array) / sizeof(array[0]);

	print_array2(array, length);

	int count = 0;

	for (int i = 0; i < length; i++)
	{
		//for (int k = 0; k < length - 1 - i; k++)
		//{
		//	// 每排一次，就能确定一个数字的最终位置，所以比较到后面，后面的数字都是有序的了，没必要再相临之间比较了
		//}
		for (int j = 0; j < length - 1; j++) // 当j = length-1时，j+1 = length，此时已经数组越界，无法正确比较。所以j < lenght-1
		{
			if (array[j] > array[j + 1])
			{
				int temp = array[j];
				array[j] = array[j + 1];
				array[j + 1] = temp;
			}
		}
		printf("一次排序:\t");
		print_array2(array, length);
		count += 1;
		
	}

	printf("排序后: \t");
	print_array2(array, length);

	return 0;
}
```