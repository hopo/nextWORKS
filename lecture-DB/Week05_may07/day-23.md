DAY-23
======
- - -

* ROW_NUMBER(), RANK(), DENSE_RANK()
* CUME_DIST(), PERCENT_RANK()
* NTILE()
* LAG(), LEAD()
* WINDOWS clause
* UNBOUNDED PRECEDING, CURRENT ROW
- - -


### exA)
* 총 사원수를 조회 (using Analytic function)
```sql
SELECT employee_id,
	   emp_name,
	   salary,
	   count(*) over(),
	   count(*) over(partition by department_id) 부서별사원수,
	   count(*) over(partition by job_id) 업무별사원수
FROM employees;
```

### ROW_NUMBER(), RANK(), DENSE_RANK()
### exA)
* 순위를 나타내는 분석함수는 order by 필수
```sql
SELECT employee_id, emp_name, salary, department_id, job_id,
   	   -- rownum rn, -- pseudo(order by 가 있으면 섞임)
       row_number() over(order by salary) rn1
FROM employees;
```

### exB) 
* 급여순으로 전체 및 부서별 행번호를 보여주세요
```sql
SELECT employee_id, emp_name, salary, department_id, job_id,
       row_number() over(partition by department_id order by salary) rn1,
       rank() over(partition by department_id order by salary) rn2,
       dense_rank() over(partition by department_id order by salary) rn3
FROM employees;
```

### exC)
* 부서별 급여 상위 rank 3까지 
```sql
select *
from (
		select employee_id, emp_name, salary, department_id, job_id,
        dense_rank() over(partition by department_id order by salary) rn3
        from employees
	 ) a
where rn3 <= 3 ;
```

### exD)
* 업무별 급여 내림차순으로 각 한명씩 조회 (1등이 아니고)
```sql
-- ???
select *
from (
		select employee_id, emp_name, salary, department_id, job_id,
        row_number() over(partition by job_id order by salary) job_rows
        from employees
     )
order by 3 desc;
```

```sql
-- 1
select *
from (
		select employee_id, emp_name, salary, department_id, job_id,
        row_number() over(partition by job_id order by salary desc) rn
        from employees
	 ) a
where rn <= 1 ;
```

### CUME_DIST(), PERCENT_RANK()
```sql
select employee_id, emp_name, salary, department_id, job_id,
       rank() over(partition by department_id order by salary) r1,
       cume_dist() over(partition by department_id order by salary) r2,
       percent_rank() over(partition by department_id order by salary) r3
from employees
where department_id in (30, 60);
```

### NTILE()
* 파티션별로 expr 명시된 값 만큼 분할한 결과를 반환
```sql
select employee_id, emp_name, salary, department_id, job_id,
       ntile(2) over(partition by department_id order by salary) t1,
       ntile(4) over(partition by department_id order by salary) t2
from employees
where department_id in (30, 60);
```

### LAG(), LEAD()
* 두번째 expr의 기본값은 1(단계)
```sql
select employee_id, emp_name, salary, department_id, job_id,
       lag(salary) over(partition by department_id order by salary) t1,
       lag(salary,2,0) over(partition by department_id order by salary) t1_2,
       lead(salary) over(partition by department_id order by salary) t2,
       lead(salary,2,0) over(partition by department_id order by salary) t2_2
from employees
where department_id in (30, 60);
```

### EXAM
### exA)
* 사원테이블을 게시판으로 가정 하고, 이전 사원번호, 이후 사원번호 조회
```sql
select employee_id, emp_name, department_id, job_id,
       lag(employee_id) over(order by salary) prev_emp_id,
       lead(employee_id) over(order by salary) next_emp_id
from employees;
```

## WINDOW clause
### exA)
```sql
select employee_id, emp_name, salary, department_id, job_id,
       sum(salary) over() s1,
       sum(salary) over(partition by department_id) s2,
       sum(salary) over(partition by department_id order by salary) s3 --누적합
from employees;
```

### exA2)
* UNBOUNDED PRECEDING, CURRENT ROW
select employee_id, emp_name, salary, department_id, job_id,
       sum(salary) over() s1,
       sum(salary) over(partition by department_id) s2,
       sum(salary) over(partition by department_id order by salary) s3,
       sum(salary) over(partition by department_id order by salary
	   					rows between unbounded preceding and current row) s4, -- 누적합
       sum(salary) over(partition by department_id order by salary
					 	rows between current row and unbounded following) s5 -- 차감
from employees;
```


- - -
-- DAY-23 end line --
